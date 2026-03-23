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
      </div>
    </PageTransition>
  )
}

const WhiteList = () => {
  const navigate = useNavigate()
  const [searchNick, setSearchNick] = useState('')
  const [result, setResult] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  
  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchNick.trim()) return
    
    setIsSearching(true)
    try {
      const { data, error } = await supabase
        .from('lores')
        .select('*')
        .ilike('nick', `%${searchNick}%`)
        .eq('status', 'Aprovada')
        .single()
      
      if (error || !data) {
        setResult('not_found')
      } else {
        setResult(data)
      }
    } catch (err) {
      setResult('error')
    } finally {
      setIsSearching(false)
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
          <div className="whitelist-search-card">
            <form className="search-box-modern" onSubmit={handleSearch}>
              <div className="input-with-icon">
                <Search className="search-icon-inner" size={20} />
                <input 
                  type="text" 
                  placeholder="Digite seu nick do Minecraft..." 
                  value={searchNick} 
                  onChange={(e) => setSearchNick(e.target.value)} 
                />
              </div>
              <button type="submit" className="search-btn-modern" disabled={isSearching}>
                {isSearching ? 'Buscando...' : 'Verificar'}
              </button>
            </form>
          </div>
          <AnimatePresence>
            {result === 'not_found' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="result-card error">
                <div className="result-icon">❌</div>
                <div className="result-info">
                  <h3>Não Encontrado</h3>
                  <p className="result-description">Este nick não foi aprovado ou não existe na whitelist.</p>
                </div>
              </motion.div>
            )}
            {result && result !== 'not_found' && result !== 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="result-card aprovada">
                <div className="result-icon">✅</div>
                <div className="result-info">
                  <h3>Aprovado!</h3>
                  <span className="result-badge">Aprovada</span>
                  <div className="result-meta">
                    <span>{result.nick}</span>
                    <span className="meta-divider">•</span>
                    <span>{result.raca}</span>
                  </div>
                  <p className="result-description"><strong>Personagem:</strong> {result.nome}</p>
                  <p className="result-description"><strong>Idade:</strong> {result.idade}</p>
                </div>
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
    <p className="lore-card-preview-text">{f.historia.substring(0, 80)}...</p>
  </div>
)
