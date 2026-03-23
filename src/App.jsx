import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import { Music, Users, Search, LogOut, User, BookOpen, PenTool, ShieldCheck, ClipboardList, X, Heart, Zap, Sparkles, Map, UserCheck } from 'lucide-react'
import './App.css'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID
const REDIRECT_URI = window.location.origin + '/login'

// ============================================================
// COMPONENTE: SidebarDivider (Divisor com ícone musical)
// ============================================================
const SidebarDivider = () => (
  <div className="sidebar-divider">
    <div className="divider-line"></div>
    <Music size={16} className="divider-icon" />
    <div className="divider-line"></div>
  </div>
)

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
  const [selectedRace, setSelectedRace] = useState(null)

  const races = [
    { 
      id: 'humanos', 
      name: 'Humanos', 
      icon: <Users size={24} />,
      content: {
        expectativa: '83 anos (média)',
        descricao: 'Os humanos são os mestres da adaptação, capazes de moldar o mundo ao seu redor por pura necessidade ou ambição. Sem as dádivas inatas de outras raças, eles compensam com uma resiliência inabalável e uma velocidade de aprendizado inigualável.',
        culturaFora: 'Aqueles que vêm de fora do continente vivem sob o fio da navalha. Em um estado constante de "luta ou fuga", a sobrevivência humana é um ato de amor e necessidade mútua. Mestres em moldar o ambiente hostil para seu próprio bem, valorizam a força bruta, a proatividade e, acima de tudo, a união inquebrável.',
        percepcaoDentro: 'Os rumores sobre os humanos que já habitam o continente pintam um quadro oposto. São vistos como seres tranquilos, beirando a preguiça e a fragilidade física e mental. No entanto, esbanjam uma arrogância intelectual, agindo como sabichões e filósofos que dominam a etiqueta e a retórica.',
        fisico: 'Simples e versáteis. Não possuem orelhas pontuadas, escamas, caldas ou qualquer traço animal. Sua força reside naquilo que não se vê à primeira vista.',
        magia: 'Páginas em branco esperando para serem preenchidas. Embora não possuam afinidade mágica nata com nenhum elemento, são capazes de aprender qualquer arte arcana. Podem não ser os melhores em uma única escola de magia, mas são os que evoluem com a maior velocidade entre todas as raças existentes.',
        habilidade: {
          nome: 'Indomável Espírito Humano',
          tipo: 'Passiva',
          descricao: 'Ao se aproximar do fim, uma força ancestral percorre o âmago do seu ser. Seu corpo se recusa a cair enquanto sua mente desejar viver.',
          efeito: 'Ao chegar a 3 corações de vida, você recebe Regeneração II, Resistência I e Força I por 30 segundos.',
          recarga: '15 minutos'
        }
      }
    },
    { id: 'anjos', name: 'Anjos', icon: <Sparkles size={24} /> },
    { id: 'demonios', name: 'Demônios', icon: <Zap size={24} /> },
    { id: 'quimeras', name: 'Quimeras', icon: <UserCheck size={24} /> },
    { id: 'aquarianos', name: 'Aquarianos', icon: <Map size={24} /> }
  ]

  return (
    <PageTransition>
      <div className="main-content">
        <div className="forum-container">
          <div className="forum-header">
            <h1>📜 Fórum Musae Eras</h1>
            <p className="forum-intro-text">
              Explore os registros das eras passadas e os segredos das raças que habitam estas terras.
            </p>
          </div>
          <div className="forum-nav">
            <button
              className={`forum-nav-btn ${activeSection === 'historia' ? 'active' : ''}`}
              onClick={() => { setActiveSection('historia'); setSelectedRace(null); }}
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
                <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="forum-section-placeholder">
                  <div className="placeholder-card">
                    <h3>Selecione uma categoria acima</h3>
                    <p>Escolha entre a História do Mundo ou as Raças Disponíveis para começar sua leitura.</p>
                  </div>
                </motion.div>
              )}

              {activeSection === 'historia' && (
                <motion.div key="historia" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="lore-section">
                  <div className="lore-intro-card">
                    <h3 className="lore-title">Abertura: O Despertar da Sinfonia</h3>
                    <div className="lore-text-content">
                      <p className="lore-highlight">Na vasta e silenciosa escuridão do universo, algo cantou.</p>
                      <p>Dessa primeira nota, o silêncio foi quebrado e o mundo começou a se moldar. Onde antes havia apenas o vazio, surgiram montanhas que parecem tocar o céu, florestas que sussurram segredos ao vento e oceanos que guardam o peso de eras esquecidas.</p>
                      <div className="lore-divider"><Music size={16} /></div>
                      <p>Muito antes de sua chegada, no ano 999, as terras deste continente já carregavam cicatrizes de histórias antigas — impérios erguidos, alianças seladas e guerras que quase apagaram civilizações inteiras. Foi nesse passado distante que nasceu o primeiro grande reino humano, marcando o início de uma nova era.</p>
                      <p>Agora, no ano 1000, um marco histórico se aproxima: o milésimo aniversário do primeiro reino humano, da grandiosa <strong className="text-primary">União entre as Raças</strong> e da fundação da capital <strong className="text-primary">Chrona</strong>.</p>
                      <div className="lore-divider"><Music size={16} /></div>
                      <p className="lore-footer">Ao desembarcar nestas terras, você não é apenas um espectador, mas uma nova nota nesta sinfonia inacabada. O que você encontrará nas ruínas do passado?</p>
                      <p className="lore-final-call">Cada escolha é um acorde, cada ação, uma mudança no destino.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'racas' && !selectedRace && (
                <motion.div key="racas-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="forum-section">
                  <h2 className="section-title">👥 Raças Disponíveis</h2>
                  <div className="race-grid">
                    {races.map(raca => (
                      <div key={raca.id} className="race-card-modern" onClick={() => raca.content && setSelectedRace(raca)}>
                        <div className="race-card-icon">{raca.icon}</div>
                        <h4>{raca.name}</h4>
                        <p>{raca.content ? 'Clique para ver detalhes' : 'Informações em breve...'}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === 'racas' && selectedRace && (
                <motion.div key={selectedRace.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="race-detail-container">
                  <button className="back-btn" onClick={() => setSelectedRace(null)}>← Voltar para Raças</button>
                  
                  <div className="race-detail-header">
                    <div className="race-detail-icon-large">{selectedRace.icon}</div>
                    <div className="race-detail-title-group">
                      <h1>{selectedRace.name}</h1>
                      <span className="race-lifespan">⏳ Expectativa de Vida: {selectedRace.content.expectativa}</span>
                    </div>
                  </div>

                  <div className="race-detail-grid">
                    <div className="race-info-block main-desc">
                      <h3><BookOpen size={20} /> A Essência Humana</h3>
                      <p>{selectedRace.content.descricao}</p>
                    </div>

                    <div className="race-info-block">
                      <h3><Users size={20} /> Cultura (Além-Mar)</h3>
                      <p>{selectedRace.content.culturaFora}</p>
                    </div>

                    <div className="race-info-block">
                      <h3><Search size={20} /> Percepção do Continente</h3>
                      <p>{selectedRace.content.percepcaoDentro}</p>
                    </div>

                    <div className="race-info-block">
                      <h3><User size={20} /> Características Físicas</h3>
                      <p>{selectedRace.content.fisico}</p>
                    </div>

                    <div className="race-info-block">
                      <h3><Sparkles size={20} /> Afinidades Mágicas</h3>
                      <p>{selectedRace.content.magia}</p>
                    </div>

                    <div className="race-info-block skill-block">
                      <div className="skill-header">
                        <Zap size={20} />
                        <h3>Habilidade Única: {selectedRace.content.habilidade.nome}</h3>
                        <span className="skill-type">{selectedRace.content.habilidade.tipo}</span>
                      </div>
                      <p className="skill-desc"><em>{selectedRace.content.habilidade.descricao}</em></p>
                      <div className="skill-effect-box">
                        <p><strong>Efeito:</strong> {selectedRace.content.habilidade.efeito}</p>
                        <p className="skill-cooldown"><strong>Recarga:</strong> {selectedRace.content.habilidade.recarga}</p>
                      </div>
                    </div>
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
    
    const loreData = {
      ...formData,
      discord_tag: user.username + '#' + user.discriminator,
      status: 'Em Análise',
      motivo_recusa: null
    }

    let error;
    if (formData.id) {
      // Se já tem ID, estamos editando (UPSERT/UPDATE)
      const { error: updateError } = await supabase
        .from('lores')
        .update(loreData)
        .eq('id', formData.id)
      error = updateError
    } else {
      // Se não tem ID, é uma nova lore (INSERT)
      const { error: insertError } = await supabase
        .from('lores')
        .insert([loreData])
      error = insertError
    }

    if (error) {
      alert('Erro ao enviar: ' + error.message)
      setIsSubmitting(false)
    } else {
      alert(formData.id ? 'Sua partitura foi corrigida e reenviada aos maestros!' : 'Sua partitura foi enviada aos maestros!')
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
              <h3 className="form-section-title">Informações do Personagem</h3>
              <div className="form-grid">
                <div className="form-group">
                  <input type="text" placeholder="Nick do Minecraft" value={formData.nick} onChange={(e) => setFormData({ ...formData, nick: e.target.value })} required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Nome do Personagem" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} required />
                </div>
                <div className="form-group">
                  <input type="number" placeholder="Idade" value={formData.idade} onChange={(e) => setFormData({ ...formData, idade: e.target.value })} required />
                </div>
                <div className="form-group">
                  <select value={formData.raca} onChange={(e) => setFormData({ ...formData, raca: e.target.value })} required>
                    <option value="">Selecione uma Raça</option>
                    <option value="Humano">Humano</option>
                    <option value="Anjo">Anjo</option>
                    <option value="Demônio">Demônio</option>
                    <option value="Quimera">Quimera</option>
                    <option value="Aquariano">Aquariano</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-section-card">
              <h3 className="form-section-title">Sua História</h3>
              <div className="form-group">
                <textarea placeholder="Conte a história do seu personagem..." value={formData.historia} onChange={(e) => setFormData({ ...formData, historia: e.target.value })} required rows="8"></textarea>
              </div>
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Enviando...' : 'Enviar Partitura'}</button>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}

const Profile = ({ user }) => {
  const navigate = useNavigate()
  const [lores, setLores] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedLore, setSelectedLore] = useState(null)

  useEffect(() => {
    if (user) fetchUserLores()
  }, [user])

  const fetchUserLores = async () => {
    const { data } = await supabase.from('lores').select('*').eq('discord_tag', user.username + '#' + user.discriminator)
    setLores(data || [])
    setLoading(false)
  }

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
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-user-info">
              <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="Avatar" className="profile-avatar" />
              <div className="profile-user-details">
                <h1>{user.username}</h1>
                <p className="profile-discord-tag">#{user.discriminator}</p>
              </div>
            </div>
          </div>
          <div className="profile-lores-section">
            <h2>Suas Partituras</h2>
            {loading ? (
              <p>Carregando...</p>
            ) : lores.length === 0 ? (
              <div className="profile-empty-state">
                <p>Você ainda não tem nenhuma partitura.</p>
                <Link to="/compor" className="sidebar-login-btn" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '1rem' }}>Compor Primeira Obra</Link>
              </div>
            ) : (
              <div className="profile-lores-grid">
                {lores.map(lore => (
                  <div key={lore.id} className="profile-lore-card-container">
                    <div className="profile-lore-card" onClick={() => { setSelectedLore(lore); setModalOpen(true); }}>
                      <div className="profile-lore-header">
                        <span className="profile-lore-nick">{lore.nick}</span>
                        <span className={`status-badge ${lore.status.toLowerCase().replace(' ', '-')}`}>{lore.status}</span>
                      </div>
                      <div className="profile-lore-body">
                        <p><strong>Nome:</strong> {lore.nome}</p>
                        <p><strong>Raça:</strong> {lore.raca}</p>
                        <p><strong>Idade:</strong> {lore.idade}</p>
                        {lore.status === 'Recusada' && lore.motivo_recusa && (
                          <div className="profile-motivo-box">
                            <strong>Motivo:</strong> {lore.motivo_recusa}
                          </div>
                        )}
                      </div>
                      {lore.status === 'Recusada' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); navigate('/compor', { state: { loreData: lore } }); }} 
                          className="profile-fix-btn"
                        >
                          Corrigir e Reenviar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MODAL DE VISUALIZAÇÃO NO PERFIL */}
        <AnimatePresence>
          {modalOpen && selectedLore && (
            <div className="modal-overlay" onClick={() => setModalOpen(false)}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
                <h2>{selectedLore.nome}</h2>
                <div className="modal-details">
                  <p><strong>Nick:</strong> {selectedLore.nick}</p>
                  <p><strong>Discord:</strong> {selectedLore.discord_tag}</p>
                  <p><strong>Raça:</strong> {selectedLore.raca}</p>
                  <p><strong>Idade:</strong> {selectedLore.idade}</p>
                  <p><strong>Status:</strong> {selectedLore.status}</p>
                </div>
                <div className="modal-historia">
                  <h3>História:</h3>
                  <p>{selectedLore.historia}</p>
                </div>
                {selectedLore.status === 'Recusada' && (
                  <div className="modal-actions">
                    <button 
                      onClick={() => { setModalOpen(false); navigate('/compor', { state: { loreData: selectedLore } }); }} 
                      className="btn-approve"
                    >
                      ✍️ Corrigir Agora
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
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

const LoreCard = ({ f, onExpand }) => (
  <div className="lore-card" onClick={() => onExpand(f)}>
    <div className="lore-card-header">
      <h4>{f.nome}</h4>
      <span className="lore-card-expand">👁️</span>
    </div>
    <p className="lore-card-nick">{f.nick}</p>
    <p className="lore-card-discord">{f.discord_tag}</p>
    <div className="lore-card-preview">
      <p className="lore-card-preview-text">{f.historia.substring(0, 80)}...</p>
    </div>
  </div>
)

const AdminPanel = ({ user }) => {
  const [activeTab, setActiveTab] = useState('lores')
  const [lores, setLores] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLore, setSelectedLore] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [admins, setAdmins] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [novoAdminId, setNovoAdminId] = useState('')
  const [novoAdminUsername, setNovoAdminUsername] = useState('')
  const [adicionandoAdmin, setAdicionandoAdmin] = useState(false)

  useEffect(() => {
    if (user) {
      verificarAdmin()
      fetchLores()
      fetchAdmins()
    }
  }, [user])

  const verificarAdmin = async () => {
    const { data } = await supabase.from('admins').select('*').eq('discord_id', user.id).single()
    setIsAdmin(!!data)
    setLoading(false)
  }

  const fetchLores = async () => {
    const { data } = await supabase.from('lores').select('*').order('created_at', { ascending: false })
    setLores(data || [])
  }

  const fetchAdmins = async () => {
    const { data } = await supabase.from('admins').select('*')
    setAdmins(data || [])
  }

  const atualizarStatus = async (id, status, motivo = null) => {
    await supabase.from('lores').update({ status, motivo_recusa: motivo }).eq('id', id)
    fetchLores()
  }

  const deletarLore = async (id) => {
    if (!confirm('⚠️ ATENÇÃO: Tem certeza que deseja DELETAR esta partitura permanentemente? Ela sumirá do perfil do usuário.')) return
    const { error } = await supabase.from('lores').delete().eq('id', id)
    if (error) alert('Erro ao deletar: ' + error.message)
    else {
      setModalOpen(false)
      fetchLores()
    }
  }

  const adicionarNovoAdmin = async () => {
    if (!novoAdminId || !novoAdminUsername) return
    setAdicionandoAdmin(true)
    const { error } = await supabase.from('admins').insert([{ discord_id: novoAdminId, discord_username: novoAdminUsername }])
    if (error) alert('Erro: ' + error.message)
    else { setNovoAdminId(''); setNovoAdminUsername(''); fetchAdmins(); }
    setAdicionandoAdmin(false)
  }
  
  const removerAdmin = async (id) => {
    if (!confirm('Tem certeza?')) return
    await supabase.from('admins').delete().eq('id', id)
    fetchAdmins()
  }
  
  if (loading) return <div className="main-content"><h1>Carregando...</h1></div>
  if (!isAdmin) return (
    <div className="main-content">
      <div className="error-card">
        <h1>⚠️ Acesso Restrito</h1>
        <p>Você não tem permissão para acessar a área administrativa.</p>
      </div>
    </div>
  )
  
  // Lógica de filtragem por Nick ou Nome
  const filteredLores = lores.filter(lore => 
    lore.nick.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lore.nome.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const emAnalise = filteredLores.filter(l => l.status === 'Em Análise')
  const aprovadas = filteredLores.filter(l => l.status === 'Aprovada')
  const recusadas = filteredLores.filter(l => l.status === 'Recusada')
  
  return (
    <PageTransition>
      <div className="main-content">
        <div className="admin-panel">
          <div className="admin-header">
            <h1>👑 Painel Administrativo</h1>
            <div className="admin-tabs">
              <button className={`admin-tab-btn ${activeTab === 'lores' ? 'active' : ''}`} onClick={() => setActiveTab('lores')}>Partituras</button>
              <button className={`admin-tab-btn ${activeTab === 'admins' ? 'active' : ''}`} onClick={() => setActiveTab('admins')}>Gerenciar Admins</button>
            </div>
          </div>
          
          {activeTab === 'lores' ? (
            <div className="admin-tab-content">
              {/* CAMPO DE BUSCA */}
              <div className="admin-search-wrapper">
                <div className="input-with-icon">
                  <Search className="search-icon-inner" size={18} />
                  <input 
                    type="text" 
                    placeholder="Pesquisar por Nick ou Nome..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="admin-search-input"
                  />
                  {searchTerm && (
                    <button className="clear-search" onClick={() => setSearchTerm('')}>
                      <X size={16} />
                    </button>
                  )}
                </div>
                <p className="search-results-info">
                  Mostrando <strong>{filteredLores.length}</strong> de {lores.length} partituras.
                </p>
              </div>

              <div className="admin-columns">
                <div className="admin-column admin-column--analise">
                  <div className="admin-column-header"><span className="admin-column-dot" style={{ background: '#f0a500' }}></span><h2>Em Análise</h2><span className="admin-column-count">{emAnalise.length}</span></div>
                  <div className="admin-column-body">{emAnalise.length === 0 ? <p className="admin-column-empty">Nenhum resultado.</p> : emAnalise.map(f => <LoreCard key={f.id} f={f} onExpand={(l) => { setSelectedLore(l); setModalOpen(true); }} />)}</div>
                </div>
                <div className="admin-column admin-column--aprovada">
                  <div className="admin-column-header"><span className="admin-column-dot" style={{ background: '#23a559' }}></span><h2>Aprovadas</h2><span className="admin-column-count">{aprovadas.length}</span></div>
                  <div className="admin-column-body">{aprovadas.length === 0 ? <p className="admin-column-empty">Nenhum resultado.</p> : aprovadas.map(f => <LoreCard key={f.id} f={f} onExpand={(l) => { setSelectedLore(l); setModalOpen(true); }} />)}</div>
                </div>
                <div className="admin-column admin-column--recusada">
                  <div className="admin-column-header"><span className="admin-column-dot" style={{ background: '#f23f43' }}></span><h2>Recusadas</h2><span className="admin-column-count">{recusadas.length}</span></div>
                  <div className="admin-column-body">{recusadas.length === 0 ? <p className="admin-column-empty">Nenhum resultado.</p> : recusadas.map(f => <LoreCard key={f.id} f={f} onExpand={(l) => { setSelectedLore(l); setModalOpen(true); }} />)}</div>
                </div>
              </div>
              
              <AnimatePresence>
                {modalOpen && selectedLore && (
                  <div className="modal-overlay" onClick={() => setModalOpen(false)}>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="modal-content" 
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
                      <h2>{selectedLore.nome}</h2>
                      <div className="modal-details">
                        <p><strong>Nick:</strong> {selectedLore.nick}</p>
                        <p><strong>Discord:</strong> {selectedLore.discord_tag}</p>
                        <p><strong>Raça:</strong> {selectedLore.raca}</p>
                        <p><strong>Idade:</strong> {selectedLore.idade}</p>
                        <p><strong>Status:</strong> {selectedLore.status}</p>
                      </div>
                      <div className="modal-historia">
                        <h3>História:</h3>
                        <p>{selectedLore.historia}</p>
                      </div>
                      <div className="modal-actions">
                        <button className="btn-approve" onClick={() => { atualizarStatus(selectedLore.id, 'Aprovada'); setModalOpen(false); }}>✅ Aprovar</button>
                        <button className="btn-refuse" onClick={() => { const motivo = prompt('Motivo da recusa:'); if (motivo) { atualizarStatus(selectedLore.id, 'Recusada', motivo); setModalOpen(false); } }}>❌ Recusar</button>
                        <button className="btn-delete-lore" onClick={() => deletarLore(selectedLore.id)}>🗑️ Deletar</button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="admin-tab-content">
              <div className="admin-add-form">
                <h3>Adicionar Novo Admin</h3>
                <input type="text" placeholder="Discord ID" value={novoAdminId} onChange={(e) => setNovoAdminId(e.target.value)} />
                <input type="text" placeholder="Discord Username" value={novoAdminUsername} onChange={(e) => setNovoAdminUsername(e.target.value)} />
                <button onClick={adicionarNovoAdmin} disabled={adicionandoAdmin}>{adicionandoAdmin ? 'Adicionando...' : 'Adicionar Admin'}</button>
              </div>
              <div className="admin-list">
                <h3>Admins Atuais</h3>
                {admins.map(admin => (
                  <AdminCard key={admin.id} admin={admin} removerAdmin={removerAdmin} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

const AdminCard = ({ admin, removerAdmin }) => (
  <div className="admin-card">
    <div className="admin-info">
      <h4>{admin.discord_username}</h4>
      <p>ID: {admin.discord_id}</p>
    </div>
    <button className="admin-remove-btn" onClick={() => removerAdmin(admin.id)}>Remover</button>
  </div>
)

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

          <SidebarDivider />

          <nav className="sidebar-nav">
            {user && <Link to="/perfil" className="nav-item" style={{ color: '#d565e5' }}><span>Perfil</span></Link>}
            <Link to="/forum" className="nav-item" style={{ color: '#f0b232' }}><span>Fórum</span></Link>
            <Link to="/compor" className="nav-item"><span>Componha sua Obra</span></Link>
            {!loadingAdmin && isAdmin && <Link to="/admin" className="nav-item" style={{ color: '#f0a500' }}><span>👑 Admin</span></Link>}

            <SidebarDivider />

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
