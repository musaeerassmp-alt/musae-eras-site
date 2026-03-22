import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import { Music, Users, Search, LogOut, User, BookOpen, PenTool, ShieldCheck, ClipboardList } from 'lucide-react'
import './App.css'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID
const REDIRECT_URI = window.location.origin + '/login'

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    style={{ width: '100%' }}
  >
    {children}
  </motion.div>
)

const FRASES_FILOSOFICAS = [
  { texto: "A alegria não está nas coisas, está em nós.", autor: "Richard Wagner" },
  { texto: "O coração tem razões que a própria razão desconhece.", autor: "Blaise Pascal" },
  { texto: "Onde há amor, há vida.", autor: "Mahatma Gandhi" },
  { texto: "A música exprime o que não pode ser dito e sobre o qual é impossível calar.", autor: "Victor Hugo" },
  { texto: "A felicidade é a única coisa que se duplica quando se compartilha.", autor: "Albert Schweitzer" },
  { texto: "A beleza das coisas existe no espírito de quem as contempla.", autor: "David Hume" },
  { texto: "O homem é o que ele sente.", autor: "Aristóteles" },
  { texto: "A melancolia é a felicidade de ser triste.", autor: "Victor Hugo" },
  { texto: "Sentir é criar. Sentir é pensar sem ideias.", autor: "Fernando Pessoa" },
  { texto: "A amizade é uma alma que habita em dois corpos.", autor: "Aristóteles" }
]

const Home = () => {
  const [frase, setFrase] = useState({ texto: "", autor: "" })
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * FRASES_FILOSOFICAS.length)
    setFrase(FRASES_FILOSOFICAS[randomIndex])
  }, [])
  return (
    <PageTransition>
      <div className="main-content home-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="home-hero"
        >
          <h1 className="home-title">Musae Eras</h1>
          <div className="quote-container">
            <p className="quote-text">"{frase.texto}"</p>
            <p className="quote-author">— {frase.autor}</p>
          </div>
          <div className="home-divider"></div>
          <p className="home-subtitle">Conecte seu Discord para começar sua sinfonia.</p>
        </motion.div>
      </div>
    </PageTransition>
  )
}

const Forum = () => {
  const [activeSection, setActiveSection] = useState('intro')
  return (
    <PageTransition>
      <div className="main-content">
        <div className="forum-container">
          <div className="forum-header">
            <h1>📜 Fórum Musae Eras</h1>
            <p className="forum-intro-text">
              Bem-vindo ao centro de conhecimento do nosso mundo. Aqui você encontrará os registros das eras passadas,
              os segredos das raças que habitam estas terras e as leis que regem a nossa sinfonia.
              Explore com sabedoria, pois cada nota escrita aqui molda o destino de Musae Eras.
            </p>
          </div>
          <div className="forum-nav">
            <button
              className={`forum-nav-btn ${activeSection === 'historia' ? 'active' : ''}`}
              onClick={() => setActiveSection('historia')}
            >
              📖 História do Mundo
            </button>
            <button
              className={`forum-nav-btn ${activeSection === 'racas' ? 'active' : ''}`}
              onClick={() => setActiveSection('racas')}
            >
              👥 Raças Disponíveis
            </button>
          </div>
          <div className="forum-content">
            <AnimatePresence mode="wait">
              {activeSection === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="forum-section-placeholder"
                >
                  <div className="placeholder-card">
                    <h3>Selecione uma categoria acima</h3>
                    <p>Escolha entre a História do Mundo ou as Raças Disponíveis para começar sua leitura.</p>
                  </div>
                </motion.div>
              )}
              {activeSection === 'historia' && (
                <motion.div
                  key="historia"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="lore-section"
                >
                  <div className="lore-intro-card">
                    <h3 className="lore-title">Abertura: O Despertar da Sinfonia</h3>
                    <div className="lore-text-content">
                      <p className="lore-highlight">Na vasta e silenciosa escuridão do universo, algo cantou.</p>
                      <p>Dessa primeira nota, o silêncio foi quebrado e o mundo começou a se moldar. Onde antes havia apenas o vazio, surgiram montanhas que parecem tocar o céu, florestas que sussurram segredos ao vento e oceanos que guardam o peso de eras esquecidas.</p>
                      <div className="lore-divider"><Music size={16} /></div>
                      <p>Muito antes de sua chegada, no ano 999, as terras deste continente já carregavam cicatrizes de histórias antigas — impérios erguidos, alianças seladas e guerras que quase apagaram civilizações inteiras. Foi nesse passado distante que nasceu o primeiro grande reino humano, marcando o início de uma nova era.</p>
                      <p>Agora, no ano 1000, um marco histórico se aproxima: o milésimo aniversário do primeiro reino humano, da grandiosa <strong className="text-primary">União entre as Raças</strong> e da fundação da capital <strong className="text-primary">Chrona</strong>. Este antigo tratado, forjado em tempos imemoriais, assegura a paz e a coexistência entre todas as raças. É neste cenário de celebração e expectativa que você, um desses viajantes, deixa para trás as pequenas ilhas onde cresceu e cruza as águas incertas em busca de algo maior. Seja por ambição, necessidade ou por um chamado que nem mesmo você compreende, seu barco corta as ondas em direção ao grande continente. No horizonte, ergue-se <strong className="text-primary">Chrona</strong>, a capital — uma cidade monumental, coração político e simbólico de toda a região, fundada no mesmo ano do Tratado. Sua chegada não poderia acontecer em momento mais decisivo.</p>
                      <div className="lore-divider"><Music size={16} /></div>
                      <p>As antigas cidades, construídas sobre camadas de tempo e esquecimento, continuam vivas. Humanos dominam grande parte delas, mas não estão sozinhos: entre becos e mercados, seres de outras naturezas coexistem, observam… e conspiram. Neste mosaico de raças e histórias, forças ocultas começam a se mover com mais intensidade. Segredos enterrados no passado ecoam novamente, como notas esquecidas que insistem em retornar à melodia.</p>
                      <div className="lore-divider"><Music size={16} /></div>
                      <p className="lore-footer">Ao desembarcar nestas terras, você não é apenas um espectador, mas uma nova nota nesta sinfonia inacabada. O que você encontrará nas ruínas do passado? De que lado ficará quando a harmonia começar a ruir? E quais objetivos irão guiar seus passos através do desconhecido?</p>
                      <p className="lore-final-call">Cada escolha é um acorde, cada ação, uma mudança no destino. Prepare sua alma, viajante, pois o continente está esperando — e a sinfonia está prestes a alcançar seu clímax.</p>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeSection === 'racas' && (
                <motion.div
                  key="racas"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="forum-section"
                >
                  <h2 className="section-title">👥 Raças Disponíveis</h2>
                  <div className="race-grid">
                    {['Humanos', 'Anjos', 'Demônios', 'Quimeras', 'Aquarianos'].map(raca => (
                      <div key={raca} className="race-card placeholder">
                        <h4>{raca}</h4>
                        <p>Informações sobre as características e habilidades desta raça serão reveladas em breve pelos Maestros.</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

const CriarFicha = ({ user }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(location.state?.loreData || { nick: '', nome: '', idade: '', raca: '', historia: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!user) return (
    <div className="main-content">
      <div className="error-card">
        <h1>⚠️ Acesso Restrito</h1>
        <p>Você precisa estar conectado ao Discord para compor sua obra.</p>
        <Link to="/login" className="sidebar-login-btn" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>Fazer Login</Link>
      </div>
    </div>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { error } = await supabase.from('lores').insert([{
      ...formData,
      discord_tag: user.username + '#' + user.discriminator,
      status: 'Em Análise',
      motivo_recusa: null
    }])
    if (error) {
      alert('Erro ao enviar: ' + error.message)
      setIsSubmitting(false)
    } else {
      alert('Sua partitura foi reenviada aos maestros!')
      navigate('/perfil')
    }
  }

  return (
    <PageTransition>
      <div className="main-content">
        <div className="compor-container">
          <div className="compor-header">
            <h1>✍️ {location.state?.loreData ? 'Corrigir sua Obra' : 'Componha sua Obra'}</h1>
            <p>{location.state?.loreData ? 'Ajuste os detalhes da sua partitura e envie novamente.' : 'Dê vida ao seu personagem e escreva sua história em Musae Eras.'}</p>
          </div>
          <form className="compor-form" onSubmit={handleSubmit}>
            <div className="form-section-card">
              <h3 className="form-section-title">👤 Informações do Viajante</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nick do Minecraft</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🎮</span>
                    <input type="text" required placeholder="Ex: Steve_Musae" value={formData.nick} onChange={(e) => setFormData({...formData, nick: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Nome do Personagem</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🎭</span>
                    <input type="text" required placeholder="Nome completo no RP" value={formData.nome} onChange={(e) => setFormData({...formData, nome: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Idade</label>
                  <div className="input-wrapper">
                    <span className="input-icon">⏳</span>
                    <input type="number" placeholder="Ex: 25" value={formData.idade} onChange={(e) => setFormData({...formData, idade: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Raça</label>
                  <div className="input-wrapper">
                    <span className="input-icon">🧬</span>
                    <input type="text" placeholder="Ex: Humano, Elfo..." value={formData.raca} onChange={(e) => setFormData({...formData, raca: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-section-card">
              <h3 className="form-section-title">📖 A Grande História (Lore)</h3>
              <div className="form-group">
                <label>Sua História</label>
                <div className="input-wrapper">
                  <span className="input-icon"><BookOpen size={20} /></span>
                  <textarea required placeholder="Escreva aqui a história do seu personagem..." value={formData.historia} onChange={(e) => setFormData({...formData, historia: e.target.value})} />
                </div>
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className="submit-btn w-full">{isSubmitting ? 'Enviando...' : 'Enviar Partitura'}</button>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}

const LoreModal = ({ lore, isOpen, onClose, atualizarStatus, isAdminView }) => {
  const [motivo, setMotivo] = useState('')
  const [showRejectInput, setShowRejectInput] = useState(false)
  if (!isOpen || !lore) return null
  const getStatusColor = (status) => {
    switch(status) {
      case 'Aprovada': return '#10b981';
      case 'Recusada': return '#ef4444';
      default: return '#f59e0b';
    }
  }
  const handleReject = () => {
    if (!motivo.trim()) return alert('Por favor, insira um motivo para a recusa.')
    atualizarStatus(lore.id, 'Recusada', motivo)
    onClose()
  }
  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal-content" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{lore.nome}</h2>
            <p className="modal-subtitle">Nick: {lore.nick}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-info-grid">
          <div className="modal-info-item"><span className="modal-info-label">Discord</span><span className="modal-info-value">{lore.discord_tag}</span></div>
          <div className="modal-info-item"><span className="modal-info-label">Idade</span><span className="modal-info-value">{lore.idade || 'Não informada'}</span></div>
          <div className="modal-info-item"><span className="modal-info-label">Raça</span><span className="modal-info-value">{lore.raca || 'Não informada'}</span></div>
          <div className="modal-info-item"><span className="modal-info-label">Status</span><span className="modal-info-value" style={{ color: getStatusColor(lore.status) }}>{lore.status}</span></div>
        </div>
        {lore.status === 'Recusada' && lore.motivo_recusa && (
          <div className="modal-lore-section" style={{ background: 'rgba(242, 63, 67, 0.05)', borderLeft: '4px solid #ef4444' }}>
            <h3 className="modal-lore-title" style={{ color: '#ef4444' }}>⚠️ Motivo da Recusa Anterior</h3>
            <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>{lore.motivo_recusa}</p>
          </div>
        )}
        <div className="modal-divider"></div>
        <div className="modal-lore-section">
          <h3 className="modal-lore-title">📖 História Completa</h3>
          <div className="modal-lore-text">{lore.historia}</div>
        </div>
        {showRejectInput && (
          <div className="modal-lore-section" style={{ background: 'rgba(242, 63, 67, 0.1)', borderRadius: '8px', margin: '0 1.5rem 1.5rem 1.5rem' }}>
            <h3 className="modal-lore-title">Motivo da Recusa</h3>
            <textarea className="admin-input" placeholder="Explique por que a ficha foi recusada..." value={motivo} onChange={(e) => setMotivo(e.target.value)} style={{ minHeight: '100px', marginBottom: '1rem' }} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="modal-btn modal-btn--reject" onClick={handleReject}>Confirmar Recusa</button>
              <button className="modal-btn modal-btn--close" onClick={() => setShowRejectInput(false)}>Cancelar</button>
            </div>
          </div>
        )}
        <div className="modal-divider"></div>
        <div className="modal-actions">
          {isAdminView && !showRejectInput && (
            <>
              {lore.status !== 'Aprovada' && <button className="modal-btn modal-btn--approve" onClick={() => { atualizarStatus(lore.id, 'Aprovada'); onClose(); }}>✓ Aprovar</button>}
              {lore.status !== 'Recusada' && <button className="modal-btn modal-btn--reject" onClick={() => setShowRejectInput(true)}>✗ Recusar</button>}
              {lore.status !== 'Em Análise' && <button className="modal-btn modal-btn--review" onClick={() => { atualizarStatus(lore.id, 'Em Análise'); onClose(); }}>⟳ Reanalisar</button>}
            </>
          )}
          <button className="modal-btn modal-btn--close" onClick={onClose}>Fechar</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const LoreCard = ({ f, onExpand }) => (
  <div className="lore-card" onClick={() => onExpand(f)} style={{ cursor: 'pointer' }}>
    <div className="lore-card-header">
      <div>
        <p className="lore-card-nick"><strong>{f.nick}</strong></p>
        <p className="lore-card-discord">{f.discord_tag}</p>
      </div>
      <span className="lore-card-expand">→</span>
    </div>
    <div className="lore-card-preview">
      <p><strong>Nome:</strong> {f.nome}</p>
      <p><strong>Idade:</strong> {f.idade || 'N/A'} | <strong>Raça:</strong> {f.raca || 'N/A'}</p>
      <p className="lore-card-preview-text">"{f.historia.substring(0, 100)}..."</p>
    </div>
  </div>
)

const Profile = ({ user }) => {
  const [myLores, setMyLores] = useState([])
  const [selectedLore, setSelectedLore] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) return
    const fetchMyLores = async () => {
      const { data } = await supabase.from('lores').select('*').eq('discord_tag', user.username + '#' + user.discriminator).order('created_at', { ascending: false })
      setMyLores(data || [])
      setLoading(false)
    }
    fetchMyLores()
  }, [user])
  if (!user) return (
    <div className="main-content">
      <div className="error-card">
        <h1>⚠️ Acesso Restrito</h1>
        <p>Você precisa estar conectado ao Discord para acessar seu perfil.</p>
        <Link to="/login" className="sidebar-login-btn" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>Fazer Login</Link>
      </div>
    </div>
  )
  return (
    <PageTransition>
      <div className="main-content">
        <div className="profile-header">
          <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="Avatar" className="profile-avatar" />
          <div className="profile-info">
            <h1>{user.username}</h1>
            <p className="profile-discord-id">ID: {user.id}</p>
          </div>
        </div>
        <div className="profile-content">
          <h2 className="profile-section-title">📚 Minhas Obras</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : myLores.length === 0 ? (
            <div className="profile-empty-state">
              <p>Você ainda não compôs nenhuma obra. Comece sua jornada!</p>
              <Link to="/compor" className="primary-btn" style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>Compor Obra</Link>
            </div>
          ) : (
            <div className="profile-lores-grid">
              {myLores.map(lore => (
                <div key={lore.id} style={{ position: 'relative' }}>
                  <LoreCard f={lore} onExpand={(l) => { setSelectedLore(l); setModalOpen(true); }} />
                  {lore.status === 'Recusada' && (
                    <button className="profile-fix-btn" onClick={() => navigate('/compor', { state: { loreData: lore } })}>Corrigir</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <AnimatePresence>{modalOpen && <LoreModal lore={selectedLore} isOpen={modalOpen} onClose={() => setModalOpen(false)} atualizarStatus={() => {}} isAdminView={false} />}</AnimatePresence>
      </div>
    </PageTransition>
  )
}

const AdminCard = ({ admin, removerAdmin }) => (
  <div className="admin-user-card">
    <div className="admin-user-info">
      <div className="admin-user-avatar">{admin.discord_username.charAt(0).toUpperCase()}</div>
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>{admin.discord_username}</p>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#8b949e' }}>ID: {admin.discord_id}</p>
      </div>
    </div>
    <button className="admin-remove-btn" onClick={() => removerAdmin(admin.id)}>Remover</button>
  </div>
)

const AdminPanel = ({ user }) => {
  const [activeTab, setActiveTab] = useState('lores')
  const [lores, setLores] = useState([])
  const [selectedLore, setSelectedLore] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [searchDiscord, setSearchDiscord] = useState('')
  const [admins, setAdmins] = useState([])
  const [novoAdminId, setNovoAdminId] = useState('')
  const [novoAdminUsername, setNovoAdminUsername] = useState('')
  const [adicionandoAdmin, setAdicionandoAdmin] = useState(false)
  useEffect(() => {
    verificarAdmin()
  }, [user])
  const verificarAdmin = async () => {
    if (!user) { setIsAdmin(false); setLoading(false); return; }
    try {
      const { data } = await supabase.from('admins').select('*').eq('discord_id', user.id).single()
      if (data) { setIsAdmin(true); fetchLores(); fetchAdmins(); }
      else setIsAdmin(false)
    } catch (err) { setIsAdmin(false); }
    finally { setLoading(false); }
  }
  const fetchLores = async () => {
    const { data } = await supabase.from('lores').select('*').order('created_at', { ascending: false })
    setLores(data || [])
  }
  const fetchAdmins = async () => {
    const { data } = await supabase.from('admins').select('*').order('created_at', { ascending: false })
    setAdmins(data || [])
  }
  const atualizarStatus = async (id, status, motivo = null) => {
    const updateData = { status }
    if (status === 'Recusada' && motivo) updateData.motivo_recusa = motivo
    else if (status === 'Aprovada' || status === 'Em Análise') updateData.motivo_recusa = null
    await supabase.from('lores').update(updateData).eq('id', id)
    fetchLores()
  }
  const adicionarNovoAdmin = async () => {
    if (!novoAdminId.trim() || !novoAdminUsername.trim()) return alert('Preencha todos os campos!')
    setAdicionandoAdmin(true)
    const { error } = await supabase.from('admins').insert([{ discord_id: novoAdminId, discord_username: novoAdminUsername }])
    if (error) alert('Erro: ' + error.message)
    else { alert('Admin adicionado!'); setNovoAdminId(''); setNovoAdminUsername(''); fetchAdmins(); }
    setAdicionandoAdmin(false)
  }
  const removerAdmin = async (adminId) => {
    if (confirm('Remover este admin?')) {
      const { error } = await supabase.from('admins').delete().eq('id', adminId)
      if (error) alert('Erro: ' + error.message)
      else { alert('Removido!'); fetchAdmins(); }
    }
  }
  if (loading) return <div className="main-content"><h1>Carregando...</h1></div>
  if (!isAdmin) return <div className="main-content"><h1>Acesso Negado</h1></div>
  const loresFiltradas = lores.filter(lore => lore.discord_tag.toLowerCase().includes(searchDiscord.toLowerCase()))
  const emAnalise = loresFiltradas.filter(f => f.status === 'Em Análise')
  const aprovadas = loresFiltradas.filter(f => f.status === 'Aprovada')
  const recusadas = loresFiltradas.filter(f => f.status === 'Recusada')
  return (
    <PageTransition>
      <div className="main-content">
        <div className="admin-header"><h1>Painel do Maestro</h1></div>
        <div className="admin-tabs-container">
          <div className="admin-tabs">
            <button className={`admin-tab-btn ${activeTab === 'lores' ? 'admin-tab-btn--active' : ''}`} onClick={() => setActiveTab('lores')}>📜 Lores</button>
            <button className={`admin-tab-btn ${activeTab === 'admins' ? 'admin-tab-btn--active' : ''}`} onClick={() => setActiveTab('admins')}>👑 Gerenciar Admins</button>
          </div>
        </div>
        {activeTab === 'lores' ? (
          <div className="admin-tab-content" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <div className="admin-search-container">
              <div className="admin-search-box">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder="Pesquisar por Discord (ex: user#0000)..." value={searchDiscord} onChange={(e) => setSearchDiscord(e.target.value)} className="admin-search-input" />
                {searchDiscord && <button className="clear-search" onClick={() => setSearchDiscord('')}>✕</button>}
              </div>
            </div>
            <div className="admin-columns">
              <div className="admin-column admin-column--analise">
                <div className="admin-column-header"><span className="admin-column-dot" style={{ background: '#f0a500' }}></span><h2>Em Análise</h2><span className="admin-column-count">{emAnalise.length}</span></div>
                <div className="admin-column-body">{emAnalise.length === 0 ? <p className="admin-column-empty">Vazio.</p> : emAnalise.map(f => <LoreCard key={f.id} f={f} onExpand={(l) => { setSelectedLore(l); setModalOpen(true); }} />)}</div>
              </div>
              <div className="admin-column admin-column--aprovada">
                <div className="admin-column-header"><span className="admin-column-dot" style={{ background: '#23a559' }}></span><h2>Aprovadas</h2><span className="admin-column-count">{aprovadas.length}</span></div>
                <div className="admin-column-body">{aprovadas.length === 0 ? <p className="admin-column-empty">Vazio.</p> : aprovadas.map(f => <LoreCard key={f.id} f={f} onExpand={(l) => { setSelectedLore(l); setModalOpen(true); }} />)}</div>
              </div>
              <div className="admin-column admin-column--recusada">
                <div className="admin-column-header"><span className="admin-column-dot" style={{ background: '#f23f43' }}></span><h2>Recusadas</h2><span className="admin-column-count">{recusadas.length}</span></div>
                <div className="admin-column-body">{recusadas.length === 0 ? <p className="admin-column-empty">Vazio.</p> : recusadas.map(f => <LoreCard key={f.id} f={f} onExpand={(l) => { setSelectedLore(l); setModalOpen(true); }} />)}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="admin-tab-content">
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div className="admin-add-form">
                <h2>Adicionar Novo Administrador</h2>
                <div className="form-group">
                  <label>ID do Discord</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={20} />
                    <input type="text" placeholder="ID do Discord" value={novoAdminId} onChange={(e) => setNovoAdminId(e.target.value)} />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Username</label>
                  <div className="input-wrapper">
                    <ClipboardList className="input-icon" size={20} />
                    <input type="text" placeholder="Username" value={novoAdminUsername} onChange={(e) => setNovoAdminUsername(e.target.value)} />
                  </div>
                </div>
                <button onClick={adicionarNovoAdmin} disabled={adicionandoAdmin} className="submit-btn" style={{ width: '100%', marginTop: '1.5rem' }}>{adicionandoAdmin ? 'Adicionando...' : 'Adicionar Admin'}</button>
              </div>
              <div className="admin-list">
                <h2>Administradores Atuais ({admins.length})</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>{admins.map(admin => <AdminCard key={admin.id} admin={admin} removerAdmin={removerAdmin} />)}</div>
              </div>
            </div>
          </div>
        )}
        <AnimatePresence>{modalOpen && <LoreModal lore={selectedLore} isOpen={modalOpen} onClose={() => setModalOpen(false)} atualizarStatus={atualizarStatus} isAdminView={true} />}</AnimatePresence>
      </div>
    </PageTransition>
  )
}

const WhiteList = () => {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search.trim()) return
    setLoading(true)
    try {
      const { data } = await supabase.from('lores').select('*').eq('nick', search.trim()).order('created_at', { ascending: false }).limit(1)
      setResult(data && data.length > 0 ? data[0] : 'not_found')
    } catch (err) {
      console.error('Erro ao buscar:', err)
      setResult('error')
    }
    setLoading(false)
  }

  return (
    <PageTransition>
      <div className="main-content">
        <div className="whitelist-container">
          <div className="whitelist-header">
            <h1>🔍 Consulta de WhiteList</h1>
            <p>Verifique o status da sua partitura em Musae Eras.</p>
          </div>
          
          <form className="whitelist-search-card" onSubmit={handleSearch}>
            <div className="search-box-modern">
              <div className="input-with-icon">
                <Search className="search-icon-inner" size={20} />
                <input 
                  type="text" 
                  placeholder="Seu nick do Minecraft..." 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)}
                  className="whitelist-search-input"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading} 
                className="search-btn-modern"
              >
                {loading ? 'Consultando...' : 'Consultar'}
              </button>
            </div>
          </form>

          <AnimatePresence>
            {result === 'not_found' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="result-card error"
              >
                <div className="result-icon">❌</div>
                <div className="result-info">
                  <h3>Nick não encontrado</h3>
                  <p className="result-description">Não encontramos nenhuma ficha para o nick "{search}". Verifique se digitou corretamente ou componha uma nova obra.</p>
                  <Link to="/compor" className="result-action-btn">Compor Obra</Link>
                </div>
              </motion.div>
            )}
            
            {result && result !== 'not_found' && result !== 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`result-card ${result.status.toLowerCase().replace(' ', '-')}`}
              >
                <div className="result-icon">
                  {result.status === 'Aprovada' ? '✅' : result.status === 'Recusada' ? '❌' : '⏳'}
                </div>
                <div className="result-info">
                  <div className="result-badge">
                    {result.status === 'Aprovada' ? '✅ APROVADA' : result.status === 'Recusada' ? '❌ RECUSADA' : '⏳ EM ANÁLISE'}
                  </div>
                  <h3>{result.nome}</h3>
                  <div className="result-meta">
                    <span><strong>Nick:</strong> {result.nick}</span>
                    <span className="meta-divider">•</span>
                    <span><strong>Raça:</strong> {result.raca}</span>
                  </div>
                  <p className="result-description">
                    {result.status === 'Aprovada' 
                      ? 'Parabéns! Sua partitura foi aprovada. Bem-vindo a Musae Eras!'
                      : result.status === 'Em Análise'
                      ? 'Sua partitura está sendo analisada pelos Maestros. Aguarde a resposta em breve.'
                      : 'Sua partitura foi recusada. Veja o motivo abaixo e considere reenviar uma versão corrigida.'}
                  </p>
                  
                  {result.status === 'Recusada' && result.motivo_recusa && (
                    <div className="motivo-recusa-box">
                      <h4>⚠️ Motivo da Recusa:</h4>
                      <p>{result.motivo_recusa}</p>
                    </div>
                  )}
                  
                  {result.status === 'Recusada' && (
                    <button 
                      onClick={() => navigate('/compor', { state: { loreData: result } })} 
                      className="result-action-btn"
                    >
                      Corrigir e Reenviar
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {result === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="result-card error"
              >
                <div className="result-icon">⚠️</div>
                <div className="result-info">
                  <h3>Erro ao Consultar</h3>
                  <p className="result-description">Ocorreu um erro ao consultar a whitelist. Tente novamente mais tarde.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="whitelist-footer-info">
            <p>💡 Dica: Digite exatamente o nick do Minecraft que você usou ao compor sua obra.</p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

const LoginPage = () => {
  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1))
    const accessToken = fragment.get('access_token')
    if (accessToken) {
      fetch('https://discord.com/api/users/@me', { headers: { authorization: `Bearer ${accessToken}` } })
        .then(res => res.json())
        .then(user => { localStorage.setItem('discord_user', JSON.stringify(user)); window.location.href = '/'; })
    } else {
      window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`
    }
  }, [])
  return <div className="main-content"><h1>Conectando ao Discord...</h1></div>
}

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('discord_user')))
  const [isAdmin, setIsAdmin] = useState(false)
  const [loadingAdmin, setLoadingAdmin] = useState(true)
  useEffect(() => { if (user) verificarAdminStatus() }, [user])
  const verificarAdminStatus = async () => {
    try {
      const { data } = await supabase.from('admins').select('*').eq('discord_id', user.id).single()
      setIsAdmin(!!data)
    } catch (err) { setIsAdmin(false); }
    finally { setLoadingAdmin(false); }
  }
  return (
    <Router>
      <div className="container">
        <aside className="sidebar">
          <Link to="/" className="logo-section">
            <img src="/rat1.png" alt="Logo" className="sidebar-logo" />
            <span className="sidebar-title">Musae Eras</span>
          </Link>
          <nav className="sidebar-nav">
            {user && <Link to="/perfil" className="nav-item" style={{ color: '#d565e5' }}><span>Perfil</span></Link>}
            <Link to="/forum" className="nav-item" style={{ color: '#f0b232' }}><span>Fórum</span></Link>
            <Link to="/compor" className="nav-item"><span>Componha sua Obra</span></Link>
            <Link to="/whitelist" className="nav-item">
              <ShieldCheck size={20} />
              <span>WhiteList</span>
            </Link>
            {!loadingAdmin && isAdmin && <Link to="/admin" className="nav-item" style={{ color: '#f0a500' }}><span>👑 Admin</span></Link>}
            {user ? (
              <button className="sidebar-login-btn" onClick={() => { localStorage.removeItem('discord_user'); window.location.href = '/'; }}>Sair</button>
            ) : (
              <Link to="/login" className="sidebar-login-btn" style={{ textDecoration: 'none', textAlign: 'center', background: '#5865F2' }}>Login com Discord</Link>
            )}
          </nav>
        </aside>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Profile user={user} />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/compor" element={<CriarFicha user={user} />} />
          <Route path="/whitelist" element={<WhiteList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
