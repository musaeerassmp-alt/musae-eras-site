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
              <h3 className="form-section-title">Informações do Personagem</h3>
              <div className="form-grid">
                <input type="text" placeholder="Nick do Minecraft" value={formData.nick} onChange={(e) => setFormData({ ...formData, nick: e.target.value })} required />
                <input type="text" placeholder="Nome do Personagem" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} required />
                <input type="number" placeholder="Idade" value={formData.idade} onChange={(e) => setFormData({ ...formData, idade: e.target.value })} required />
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
            <div className="form-section-card">
              <h3 className="form-section-title">Sua História</h3>
              <textarea placeholder="Conte a história do seu personagem..." value={formData.historia} onChange={(e) => setFormData({ ...formData, historia: e.target.value })} required rows="8"></textarea>
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
                  <div key={lore.id} className="profile-lore-card">
                    <div className="lore-card-header">
                      <h3>{lore.nome}</h3>
                      <span className={`lore-status lore-status-${lore.status.toLowerCase().replace(' ', '-')}`}>{lore.status}</span>
                    </div>
                    <div className="lore-card-details">
                      <p><strong>Nick:</strong> {lore.nick}</p>
                      <p><strong>Raça:</strong> {lore.raca}</p>
                      <p><strong>Idade:</strong> {lore.idade}</p>
                    </div>
                    {lore.status === 'Recusada' && lore.motivo_recusa && (
                      <div className="lore-card-motivo">
                        <p><strong>Motivo:</strong> {lore.motivo_recusa}</p>
                        <button onClick={() => navigate('/compor', { state: { loreData: lore } })} className="result-action-btn">Corrigir e Reenviar</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

const WhiteList = () => {
  const [searchNick, setSearchNick] = useState('')
  const [result, setResult] = useState(null)
  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchNick.trim()) return
    try {
      const { data } = await supabase.from('lores').select('*').eq('nick', searchNick).eq('status', 'Aprovada').single()
      setResult(data || 'not_found')
    } catch (err) {
      setResult('error')
    }
  }
  return (
    <PageTransition>
      <div className="main-content">
        <div className="whitelist-container">
          <div className="whitelist-header">
            <h1>🛡️ WhiteList</h1>
            <p>Verifique se seu personagem foi aprovado para jogar em Musae Eras.</p>
          </div>
          <form className="whitelist-form" onSubmit={handleSearch}>
            <div className="whitelist-input-group">
              <input type="text" placeholder="Digite seu nick do Minecraft..." value={searchNick} onChange={(e) => setSearchNick(e.target.value)} className="whitelist-input" />
              <button type="submit" className="whitelist-btn">Verificar</button>
            </div>
          </form>
          <AnimatePresence>
            {result === 'not_found' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="result-card not-found">
                <div className="result-icon">❌</div>
                <div className="result-info">
                  <h3>Não Encontrado</h3>
                  <p className="result-description">Este nick não foi aprovado ou não existe na whitelist.</p>
                </div>
              </motion.div>
            )}
            {result && result !== 'not_found' && result !== 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="result-card approved">
                <div className="result-icon">✅</div>
                <div className="result-info">
                  <h3>Aprovado!</h3>
                  <p className="result-description">Seu personagem foi aprovado e está pronto para jogar!</p>
                </div>
                <div className="result-details">
                  <p><strong>Nick:</strong> {result.nick}</p>
                  <p><strong>Personagem:</strong> {result.nome}</p>
                  <p><strong>Raça:</strong> {result.raca}</p>
                </div>
                {result.status === 'Recusada' && result.motivo_recusa && (
                  <div className="motivo-recusa-box">
                    <h4>⚠️ Motivo da Recusa:</h4>
                    <p>{result.motivo_recusa}</p>
                  </div>
                )}
                {result.status === 'Recusada' && (
                  <button onClick={() => navigate('/compor', { state: { loreData: result } })} className="result-action-btn">
                    Corrigir e Reenviar
                  </button>
                )}
              </motion.div>
            )}
            {result === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="result-card error">
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

const LoreCard = ({ f, onExpand }) => (
  <div className="lore-card" onClick={() => onExpand(f)}>
    <h4>{f.nome}</h4>
    <p className="lore-card-nick">{f.nick}</p>
    <p className="lore-card-discord">{f.discord_tag}</p>
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
            {modalOpen && selectedLore && (
              <div className="modal-overlay" onClick={() => setModalOpen(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
                  </div>
                </div>
              </div>
            )}
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

          {/* PRIMEIRO DIVISOR: Entre o nome e as abas */}
          <SidebarDivider />

          <nav className="sidebar-nav">
            {user && <Link to="/perfil" className="nav-item" style={{ color: '#d565e5' }}><span>Perfil</span></Link>}
            <Link to="/forum" className="nav-item" style={{ color: '#f0b232' }}><span>Fórum</span></Link>
            <Link to="/compor" className="nav-item"><span>Componha sua Obra</span></Link>
            <Link to="/whitelist" className="nav-item">
              <ShieldCheck size={20} />
              <span>WhiteList</span>
            </Link>
            {!loadingAdmin && isAdmin && <Link to="/admin" className="nav-item" style={{ color: '#f0a500' }}><span>👑 Admin</span></Link>}

            {/* SEGUNDO DIVISOR: Entre as abas e o botão Sair */}
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
          <Route path="/whitelist" element={<WhiteList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
