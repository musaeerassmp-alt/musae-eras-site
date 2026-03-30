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
        expectativa: '83 anos de persistência',
        descricao: 'Onde outras raças nascem com o poder de mover montanhas ou dobrar a realidade, o humano nasce apenas com o desejo de fazê-lo. Somos a raça da adaptação, os arquitetos do improvável. Nossa força não vem de linhagens divinas ou ancestrais mágicos, mas do suor, da proatividade e da teimosia em não aceitar o destino imposto.',
        culturaFora: 'Para aqueles que cruzaram as águas em busca do continente, a vida foi uma sinfonia de luta. Sobrevivemos sob o fio da navalha, onde cada dia era uma batalha entre o "lutar" e o "fugir". Fora daqui, aprendemos que a união não é apenas uma escolha, mas uma necessidade vital. Valorizamos a força de quem age, a coragem de quem protege e o amor que nos mantém juntos quando tudo o mais desmorona.',
        percepcaoDentro: 'Os que já habitam o continente, protegidos por muralhas e tratados, parecem ter esquecido o peso do aço. São vistos por nós como intelectuais de mãos limpas, talvez um pouco lentos e arrogantes em sua sabedoria de livros. Dizem que são frágeis, que a paz os tornou preguiçosos... mas talvez tenham apenas encontrado uma harmonia que nós, os de fora, ainda estamos lutando para compreender.',
        fisico: 'Nossa aparência é o reflexo da nossa simplicidade: não temos orelhas pontiagudas para ouvir o além, nem escamas para nos proteger do fogo. Somos carne, osso e vontade. Um espelho limpo da natureza, sem adornos, onde a verdadeira beleza reside na diversidade de nossas faces e na força de nossos passos.',
        magia: 'Dizem que somos páginas em branco. Enquanto um anjo nasce com a luz e um demônio com o fogo, o humano nasce com o vazio — e é nesse vazio que reside nossa maior vantagem. Podemos aprender qualquer segredo arcano, trilhar qualquer caminho místico. Não somos os mestres naturais de nenhum elemento, mas somos os que evoluem com a velocidade de um vendaval, preenchendo nossas páginas com a magia que escolhermos conquistar.',
        lendas: [
          {
            nome: "Krampus",
            relato: "Krampus é uma criatura abominável, com patas de bode, chifres de cabra, cauda com ponta como de tridente, garras afiadas como as de um leão e língua de serpente. Muitos pais advertem seus filhos para se comportarem e serem obedientes, caso contrário Krampus as buscará e as castigará. Existem diversos relatos de crianças travessas que somem no primeiro solstício de inverno e aparecem somente a noite, com marcas de chicote nas costas e com os olhos cheios de temor, mas com uma lição aprendida: respeite seus pais."
          },
          {
            nome: "Althira",
            relato: "Dizem que o espírito de Althira vaga pelos mares cheia de raiva e sede de vingança. Ela atrai qualquer homem que veja com suas canções e aparência exuberante, o espírito então os afoga e naufraga suas embarcações. Relatos dizem que Althira ignora embarcações cujo o capitão seja uma mulher."
          },
          {
            nome: "Kaelthar, a Luz do Céu",
            relato: "Há um século, em meio a conflitos humanos, uma luz intensa teria descido do céu. Dela, um ser alado com voz de trovão surgiu dizendo: 'Não temam, eis que está sobre vós a justiça dos céus'. O ser exterminou o grupo maligno 'Sangue e Aço' de maneira limpa e rápida. Desde esse dia, diversas canções foram feitas em homenagem a este ser misterioso que recebeu o nome de: 'Kaelthar das Himmelslicht'."
          },
          {
            nome: "Vaelion, a Sorte",
            relato: "Séculos atrás, um surto de doença quase dizimou os humanos. Tomados pelo desespero, o povo cantava: 'Alguém por favor atenda ao nosso clamor, mude a nossa sorte e acabe com nossa dor'. Misteriosamente, a doença acabou conforme pediram. Hoje, as pessoas continuam proferindo este canto e dão o nome de 'Vaelion, a sortuda' para a entidade que os atendeu."
          }
        ],
        habilidade: {
          nome: 'Indomável Espírito Humano',
          tipo: 'Despertar Ancestral',
          descricao: 'Quando o corpo clama pela queda e o fôlego se esvai, algo profundo e indomável desperta em suas veias. É o grito de mil gerações que se recusaram a morrer.',
          efeito: 'Ao atingir o limiar de 3 corações, sua vontade se torna aço: você recebe Regeneração II, Resistência I e Força I por 30 segundos, negando o abraço da morte.',
          recarga: '15 minutos de descanso da alma'
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
                      <p className="lore-highlight">Na vasta e silenciosa escuridão do universe, algo cantou.</p>
                      <p>Dessa primeira nota, o silêncio foi quebrado e o mundo começou a se moldar. Onde antes havia apenas o vazio, surgiram montanhas que parecem tocar o céu, florestas que sussurram segredos ao vento e oceanos que guardam o peso de eras esquecidas.</p>
                      
                      <div className="lore-divider"><Music size={16} /></div>
                      
                      <p>Muito antes de sua chegada, no ano 999, as terras deste continente já carregavam cicatrizes de histórias antigas — impérios erguidos, alianças seladas e guerras que quase apagaram civilizações inteiras. Foi nesse passado distante que nasceu o primeiro grande reino humano, marcando o início de uma nova era.</p>
                      
                      <p>Agora, no ano 1000, um marco histórico se aproxima: o milésimo aniversário do primeiro reino humano, da grandiosa <strong className="text-primary">União entre as Raças</strong> e da fundação da capital <strong className="text-primary">Chrona</strong>. Este antigo tratado, forjado em tempos imemoriais, assegura a paz e a coexistência entre todas as raças.</p>
                      
                      <div className="lore-quote-box">
                        <p>É neste cenário de celebração e expectativa que você, um desses viajantes, deixa para trás as pequenas ilhas onde cresceu e cruza as águas incertas em busca de algo maior. Seja por ambição, necessidade ou por um chamado que nem mesmo você compreende, seu barco corta as ondas em direção ao grande continente.</p>
                      </div>

                      <p>No horizonte, ergue-se <strong className="text-primary">Chrona</strong>, a capital — uma cidade monumental, coração político e simbólico de toda a região, fundada no mesmo ano do Tratado. Sua chegada não poderia acontecer em momento mais decisivo.</p>
                      
                      <p>As antigas cidades, construídas sobre camadas de tempo e esquecimento, continuam vivas. Humanos dominam grande parte delas, mas não estão sozinhos: entre becos e mercados, seres de outras naturezas coexistem, observam… e conspiram. Neste mosaico de raças e histórias, forças ocultas começam a se mover com mais intensidade. Segredos enterrados no passado ecoam novamente, como notas esquecidas que insistem em retornar à melodia.</p>
                      
                      <div className="lore-divider"><Music size={16} /></div>
                      
                      <p className="lore-footer">Ao desembarcar nestas terras, você não é apenas um espectador, mas uma nova nota nesta sinfonia inacabada. O que você encontrará nas ruínas do passado? De que lado ficará quando a harmonia começar a ruir? E quais objetivos irá perseguir?</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'racas' && (
                <motion.div key="racas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="races-section">
                  <div className="races-grid">
                    {races.map(race => (
                      <button
                        key={race.id}
                        className={`race-card ${selectedRace?.id === race.id ? 'active' : ''}`}
                        onClick={() => setSelectedRace(race)}
                      >
                        <div className="race-icon">{race.icon}</div>
                        <span>{race.name}</span>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {selectedRace ? (
                      <motion.div
                        key={selectedRace.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="race-details-card"
                      >
                        <div className="race-details-header">
                          <h2>{selectedRace.name}</h2>
                          <div className="race-stat-badge">
                            <Heart size={16} />
                            <span>Expectativa: {selectedRace.content?.expectativa || '???'}</span>
                          </div>
                        </div>

                        <div className="race-details-content">
                          {selectedRace.content ? (
                            <>
                              <div className="lore-block">
                                <h3 className="lore-subtitle"><BookOpen size={20} /> A Essência</h3>
                                <p>{selectedRace.content.descricao}</p>
                              </div>

                              <div className="lore-two-columns">
                                <div className="lore-block">
                                  <h3 className="lore-subtitle"><Map size={20} /> Cultura (Fora)</h3>
                                  <p>{selectedRace.content.culturaFora}</p>
                                </div>
                                <div className="lore-block">
                                  <h3 className="lore-subtitle"><ShieldCheck size={20} /> Percepção (Dentro)</h3>
                                  <p>{selectedRace.content.percepcaoDentro}</p>
                                </div>
                              </div>

                              <div className="lore-block">
                                <h3 className="lore-subtitle"><User size={20} /> Aspecto Físico</h3>
                                <p>{selectedRace.content.fisico}</p>
                              </div>

                              <div className="lore-block">
                                <h3 className="lore-subtitle"><Zap size={20} /> Afinidade Mágica</h3>
                                <p>{selectedRace.content.magia}</p>
                              </div>

                              {/* Seção de Lendas */}
                              {selectedRace.content.lendas && (
                                <div className="lore-lendas-section">
                                  <h3 className="lore-subtitle"><BookOpen size={20} /> Lendas e Relatos</h3>
                                  <div className="lendas-grid">
                                    {selectedRace.content.lendas.map((lenda, index) => (
                                      <div key={index} className="lenda-card">
                                        <h4>{lenda.nome}</h4>
                                        <p>"{lenda.relato}"</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="ability-card">
                                <div className="ability-header">
                                  <div className="ability-title">
                                    <Sparkles size={20} />
                                    <span>{selectedRace.content.habilidade.nome}</span>
                                  </div>
                                  <span className="ability-type">{selectedRace.content.habilidade.tipo}</span>
                                </div>
                                <p className="ability-desc">{selectedRace.content.habilidade.descricao}</p>
                                <div className="ability-effect">
                                  <strong>Efeito:</strong> {selectedRace.content.habilidade.efeito}
                                </div>
                                <div className="ability-cooldown">
                                  <strong>Recarga:</strong> {selectedRace.content.habilidade.recarga}
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="placeholder-card">
                              <p>Os registros sobre esta raça ainda estão sendo traduzidos pelos escribas de Chrona...</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="race-placeholder">
                        <p>Selecione uma raça para ver seus detalhes</p>
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

const Profile = ({ user }) => {
  const [lores, setLores] = useState([])
  const [selectedLore, setSelectedLore] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (user) fetchUserLores()
  }, [user])

  const fetchUserLores = async () => {
    // BUSCA INTELIGENTE: Procura pelo nome puro e pelo nome com #0 para garantir que apareça
    const { data } = await supabase
      .from('lores')
      .select('*')
      .or(`discord_tag.eq.${user.username},discord_tag.eq.${user.username}#0`)
      .order('created_at', { ascending: false })
    setLores(data || [])
  }

  if (!user) return <div className="main-content"><h1>Por favor, faça login.</h1></div>

  return (
    <PageTransition>
      <div className="main-content">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-user-info">
              {/* FIX DEFINITIVO DO AVATAR COM FALLBACK AUTOMÁTICO */}
              <img 
                src={user.avatar_url} 
                alt="" 
                className="profile-avatar" 
                onError={(e) => {
                  // Se o avatar do Discord falhar, usa um placeholder bonito com a inicial
                  e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=d565e5&color=fff&size=128`;
                  e.target.onerror = null; // Evita loop infinito
                }}
              />
              <div className="profile-user-details">
                <h1>{user.username}</h1>
                <p className="profile-discord-tag">@{user.username}</p>
              </div>
            </div>
          </div>

          <div className="profile-lores-section">
            <h2>Minhas Partituras</h2>
            {lores.length === 0 ? (
              <div className="placeholder-card">
                <p>Você ainda não compôs nenhuma obra. Vá até "Componha sua Obra" para começar!</p>
              </div>
            ) : (
              <div className="profile-lores-grid">
                {lores.map(f => (
                  <LoreCard key={f.id} f={f} onExpand={(l) => { setSelectedLore(l); setModalOpen(true); }} />
                ))}
              </div>
            )}
          </div>
        </div>

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
                  <p><strong>Raça:</strong> {selectedLore.raca}</p>
                  <p><strong>Idade:</strong> {selectedLore.idade}</p>
                  <p><strong>Status:</strong> <span className={`status-badge ${(selectedLore.status || 'Em Análise').toLowerCase().replace(' ', '-')}`}>{selectedLore.status || 'Em Análise'}</span></p>
                </div>
                <div className="modal-historia">
                  <h3>História:</h3>
                  <p>{selectedLore.historia}</p>
                </div>
                {selectedLore.status === 'Recusada' && selectedLore.motivo_recusa && (
                  <div className="profile-motivo-box">
                    <strong>Motivo da Recusa:</strong>
                    <p>{selectedLore.motivo_recusa}</p>
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

const CriarFicha = ({ user }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ nome: '', nick: '', raca: 'Humanos', idade: '', historia: '' })
  const [enviando, setEnviando] = useState(false)

  if (!user) return <div className="main-content"><h1>Por favor, faça login para compor.</h1></div>

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    const { error } = await supabase.from('lores').insert([{
      nome: formData.nome,
      nick: formData.nick,
      raca: formData.raca,
      idade: formData.idade,
      historia: formData.historia,
      discord_tag: user.username,
      status: 'Em Análise'
    }])
    if (error) alert('Erro ao enviar: ' + error.message)
    else { alert('Sua partitura foi enviada para análise!'); navigate('/perfil') }
    setEnviando(false)
  }

  return (
    <PageTransition>
      <div className="main-content">
        <div className="form-container">
          <h1>🎼 Componha sua Obra</h1>
          <p>Dê vida ao seu personagem e envie sua história para os mestres de Chrona.</p>
          <form onSubmit={handleSubmit} className="lore-form">
            <div className="form-group">
              <label>Nome do Personagem</label>
              <input type="text" required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Nick no Minecraft</label>
              <input type="text" required value={formData.nick} onChange={e => setFormData({...formData, nick: e.target.value})} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Raça</label>
                <select value={formData.raca} onChange={e => setFormData({...formData, raca: e.target.value})}>
                  <option>Humanos</option><option>Anjos</option><option>Demônios</option><option>Quimeras</option><option>Aquarianos</option>
                </select>
              </div>
              <div className="form-group">
                <label>Idade</label>
                <input type="number" required value={formData.idade} onChange={e => setFormData({...formData, idade: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label>História (Mínimo 15 lines)</label>
              <textarea required rows="15" value={formData.historia} onChange={e => setFormData({...formData, historia: e.target.value})} placeholder="Conte a trajetória do seu personagem..."></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={enviando}>{enviando ? 'Enviando...' : 'Enviar Partitura'}</button>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}

const LoginPage = () => {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const params = new URLSearchParams(hash.substring(1))
      const accessToken = params.get('access_token')
      if (accessToken) fetchDiscordUser(accessToken)
    }
  }, [])

  const fetchDiscordUser = async (token) => {
    const res = await fetch('https://discord.com/api/users/@me', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    const avatarUrl = data.avatar 
      ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${data.discriminator % 5}.png`;
      
    const user = { id: data.id, username: data.username, avatar_url: avatarUrl }
    localStorage.setItem('discord_user', JSON.stringify(user))
    window.location.href = '/perfil'
  }

  const handleLogin = () => {
    const url = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`
    window.location.href = url
  }

  return (
    <div className="main-content">
      <div className="login-card">
        <h1>Bem-vindo a Musae Eras</h1>
        <button onClick={handleLogin} className="discord-btn">Entrar com Discord</button>
      </div>
    </div>
  )
}

const LoreCard = ({ f, onExpand }) => (
  <div className="profile-lore-card-container" onClick={() => onExpand(f)}>
    <div className="profile-lore-card">
      <div className="profile-lore-header">
        <span className="profile-lore-nick">{f.nick}</span>
        <span className={`status-badge ${(f.status || 'Em Análise').toLowerCase().replace(' ', '-')}`}>{f.status || 'Em Análise'}</span>
      </div>
      <div className="profile-lore-body">
        <p><strong>Nome:</strong> {f.nome}</p>
        <p><strong>Raça:</strong> {f.raca}</p>
      </div>
      <p className="lore-card-preview-text">{f.historia?.substring(0, 80)}...</p>
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
  
  const filteredLores = lores.filter(lore => 
    lore.nick?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lore.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const emAnalise = filteredLores.filter(l => (l.status || 'Em Análise') === 'Em Análise')
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
                        <p><strong>Status:</strong> {selectedLore.status || 'Em Análise'}</p>
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
            <img src="/logo.png" alt="Logo" className="sidebar-logo" />
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
