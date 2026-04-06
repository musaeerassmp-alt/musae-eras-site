import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import { Music, Users, Search, LogOut, User, BookOpen, PenTool, ShieldCheck, ClipboardList, X, Heart, Zap, Sparkles, Map, UserCheck, DollarSign, Star } from 'lucide-react'
import Apoios from './Apoios'
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

export const PageTransition = ({ children }) => (
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
                      
                      <p>Agora, no ano 1000, um marco histórico se aproxima: o milésimo aniversário do primeiro reino humano, da grandiosa <span className="text-primary">União entre as Raças</span> e da fundação da capital <span className="text-primary">Chrona</span>. Este antigo tratado, forjado em tempos imemoriais, assegura a paz e a coexistência entre todas as raças.</p>
                      
                      <p>É neste cenário de celebração e expectativa que você, um desses viajantes, deixa para trás as pequenas ilhas onde cresceu e cruza as águas incertas em busca de algo maior. Seja por ambição, necessidade ou por um chamado que nem mesmo você compreende, seu barco corta as ondas em direção ao grande continente.</p>
                      
                      <p>No horizonte, ergue-se <span className="text-primary">Chrona</span>, a capital — uma cidade monumental, coração político e simbólico de toda a região, fundada no mesmo ano do Tratado. Sua chegada não poderia acontecer em momento mais decisivo.</p>
                      
                      <p>As antigas cidades, construídas sobre camadas de tempo e esquecimento, continuam vivas. Humanos dominam grande parte delas, mas não estão sozinhos: entre becos e mercados, seres de outras naturezas coexistem, observam... e conspiram. Neste mosaico de raças e histórias, forças ocultas começam a se mover com mais intensidade. Segredos enterrados no passado ecoam novamente, como notas esquecidas que insistem em retornar à melodia.</p>
                      
                      <div className="lore-divider"><Music size={16} /></div>
                      
                      <p className="lore-footer">Ao desembarcar nestas terras, você não é apenas um espectador, mas uma nova nota nesta sinfonia inacabada. O que você encontrará nas ruínas do passado? De que lado ficará quando a harmonia começar a ruir? E quais objetivos irá perseguir?</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === 'racas' && (
                <motion.div key="racas" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="races-grid">
                    {races.map(race => (
                      <div
                        key={race.id}
                        className={`race-card ${selectedRace?.id === race.id ? 'active' : ''}`}
                        onClick={() => setSelectedRace(race)}
                      >
                        <div className="race-icon">{race.icon}</div>
                        <span>{race.name}</span>
                      </div>
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
                            <Heart size={16} /> {selectedRace.content.expectativa}
                          </div>
                        </div>

                        <div className="lore-block">
                          <div className="lore-subtitle"><BookOpen size={20} /> A Essência</div>
                          <p>{selectedRace.content.descricao}</p>
                        </div>

                        <div className="lore-two-columns">
                          <div className="lore-block">
                            <div className="lore-subtitle"><Map size={20} /> Cultura (Fora)</div>
                            <p>{selectedRace.content.culturaFora}</p>
                          </div>
                          <div className="lore-block">
                            <div className="lore-subtitle"><ShieldCheck size={20} /> Percepção (Dentro)</div>
                            <p>{selectedRace.content.percepcaoDentro}</p>
                          </div>
                        </div>

                        <div className="lore-two-columns">
                          <div className="lore-block">
                            <div className="lore-subtitle"><User size={20} /> Físico</div>
                            <p>{selectedRace.content.fisico}</p>
                          </div>
                          <div className="lore-block">
                            <div className="lore-subtitle"><Zap size={20} /> Magia</div>
                            <p>{selectedRace.content.magia}</p>
                          </div>
                        </div>

                        <div className="lore-lendas-section">
                          <div className="lore-subtitle"><Sparkles size={20} /> Lendas Conhecidas</div>
                          <div className="lendas-grid">
                            {selectedRace.content.lendas.map((lenda, index) => (
                              <div key={index} className="lenda-card">
                                <h4>{lenda.nome}</h4>
                                <p>"{lenda.relato}"</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="ability-card">
                          <div className="ability-title">
                            <Zap size={24} /> {selectedRace.content.habilidade.nome}
                            <span className="ability-type">{selectedRace.content.habilidade.tipo}</span>
                          </div>
                          <p className="ability-description">{selectedRace.content.habilidade.descricao}</p>
                          <div className="ability-footer">
                            <div className="ability-effect"><strong>Efeito:</strong> {selectedRace.content.habilidade.efeito}</div>
                            <div className="ability-cooldown"><strong>Recarga:</strong> {selectedRace.content.habilidade.recarga}</div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="race-placeholder">Selecione uma raça para ver seus detalhes</div>
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
    const { data } = await supabase
      .from("lores")
      .select("*, vip_tag") // Seleciona também a vip_tag
      .or(`discord_tag.eq.${user.username},discord_tag.eq.${user.username}#0`)
      .order("created_at", { ascending: false })
    setLores(data || [])
  }

  if (!user) return <div className="main-content"><h1>Por favor, faça login.</h1></div>

  return (
    <PageTransition>
      <div className="main-content">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-user-info">
              <img 
                src={user.avatar_url} 
                alt="" 
                className="profile-avatar" 
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=d565e5&color=fff` }}
              />
              <div>
                <h1 className="profile-username">{user.username}</h1>
                <p className="profile-discord-tag">@{user.username}</p>
                {user.vip_tag && (
                  <span className={`vip-tag vip-tag--${user.vip_tag.toLowerCase().replace("+", "-plus")}`}>
                    {user.vip_tag}
                  </span>
                )}
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
                  <div key={f.id} className="profile-lore-card" onClick={() => { setSelectedLore(f); setModalOpen(true); }}>
                    <div className="status-badge" style={{ 
                      backgroundColor: f.status === "APROVADA" ? "rgba(35, 165, 89, 0.2)" : f.status === "RECUSADA" ? "rgba(242, 63, 71, 0.2)" : "rgba(240, 178, 50, 0.2)",
                      color: f.status === "APROVADA" ? "#23a559" : f.status === "RECUSADA" ? "#f23f47" : "#f0b232"
                    }}>
                      {f.status}
                    </div>
                    <div className="profile-lore-header">
                      <span className="profile-lore-nick">{f.nick}</span>
                    </div>
                    <p><strong>Nome:</strong> {f.nome}</p>
                    <p><strong>Raça:</strong> {f.raca}</p>
                    <p className="profile-lore-preview">{f.historia.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {modalOpen && selectedLore && (
            <div className="modal-overlay" onClick={() => setModalOpen(false)}>
              <motion.div 
                className="modal-content" 
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <button className="modal-close" onClick={() => setModalOpen(false)}><X size={24} /></button>
                <h2>{selectedLore.nome}</h2>
                <div className="modal-details">
                  <p><strong>Nick:</strong> {selectedLore.nick}</p>
                  <p><strong>Raça:</strong> {selectedLore.raca}</p>
                  <p><strong>Idade:</strong> {selectedLore.idade}</p>
                  {selectedLore.vip_tag && (
                    <span className={`vip-tag vip-tag--${selectedLore.vip_tag.toLowerCase().replace("+", "-plus")}`}>
                      {selectedLore.vip_tag}
                    </span>
                  )}
                  <div className="status-badge" style={{ 
                    backgroundColor: selectedLore.status === "APROVADA" ? "rgba(35, 165, 89, 0.2)" : selectedLore.status === "RECUSADA" ? "rgba(242, 63, 71, 0.2)" : "rgba(240, 178, 50, 0.2)",
                    color: selectedLore.status === "APROVADA" ? "#23a559" : selectedLore.status === "RECUSADA" ? "#f23f47" : "#f0b232"
                  }}>
                    {selectedLore.status}
                  </div>
                </div>
                <div className="modal-historia">
                  <h3>História:</h3>
                  <p>{selectedLore.historia}</p>
                </div>
                {selectedLore.status === "RECUSADA" && selectedLore.motivo && (
                  <div className="profile-motivo-box">
                    <strong>Motivo da Recusa:</strong>
                    <p>{selectedLore.motivo}</p>
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
  const [formData, setFormData] = useState({ nome: '', nick: '', raca: 'Humanos', idade: '', historia: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return alert('Faça login primeiro!')
    setLoading(true)
    const { error } = await supabase.from('lores').insert([{
      ...formData,
      discord_tag: user.username,
      status: 'EM ANÁLISE'
    }])
    setLoading(false)
    if (error) alert('Erro ao enviar: ' + error.message)
    else { alert('Ficha enviada com sucesso!'); navigate('/perfil') }
  }

  return (
    <PageTransition>
      <div className="main-content">
        <div className="form-container">
          <h1>🎼 Componha sua Obra</h1>
          <form onSubmit={handleSubmit} className="ficha-form">
            <div className="form-group">
              <label>Nome do Personagem</label>
              <input type="text" required value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Nick no Minecraft</label>
              <input type="text" required value={formData.nick} onChange={e => setFormData({...formData, nick: e.target.value})} />
            </div>
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
            <div className="form-group">
              <label>História (Mínimo 15 linhas)</label>
              <textarea required rows="10" value={formData.historia} onChange={e => setFormData({...formData, historia: e.target.value})} />
            </div>
            <button type="submit" disabled={loading} className="submit-btn">{loading ? 'Enviando...' : 'Enviar Sinfonia'}</button>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}

const LoginPage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1))
    const token = params.get('access_token')
    if (token) fetchDiscordUser(token)
  }, [])

  const fetchDiscordUser = async (token) => {
    const res = await fetch('https://discord.com/api/users/@me', { headers: { Authorization: `Bearer ${token}` } })
    const data = await res.json()
    const avatarUrl = data.avatar 
      ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=256`
      : `https://cdn.discordapp.com/embed/avatars/${data.discriminator % 5}.png`
    const user = { id: data.id, username: data.username, avatar_url: avatarUrl }
    localStorage.setItem('discord_user', JSON.stringify(user))
    window.location.href = '/perfil'
  }

  return (
    <div className="main-content">
      <h1>Conectando ao Discord...</h1>
    </div>
  )
}

const AdminPanel = ({ user }) => {
  const [activeTab, setActiveTab] = useState("lores");
  const [lores, setLores] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [newAdminName, setNewAdminName] = useState("");
  const [selectedLore, setSelectedLore] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const vipTags = ["Nenhum", "VIP", "VIP+", "VIP++", "Beta"];

  const pendingLores = lores.filter(lore => lore.status === "PENDENTE");
  const approvedLores = lores.filter(lore => lore.status === "APROVADA");
  const rejectedLores = lores.filter(lore => lore.status === "RECUSADA");

  useEffect(() => {
    if (user) {
      fetchAllLores();
      fetchAllAdmins();
    }
  }, [user]);

  const fetchAllLores = async () => {
    const { data } = await supabase.from("lores").select("*").order("created_at", { ascending: false });
    setLores(data || []);
  };

  const fetchAllAdmins = async () => {
    const { data } = await supabase.from("admins").select("*");
    setAdmins(data || []);
  };

  const updateStatus = async (id, status) => {
    let motivo = null;
    if (status === "RECUSADA") {
      motivo = prompt("Por favor, insira o motivo da recusa:");
      if (!motivo || motivo.trim() === "") {
        alert("O motivo da recusa é obrigatório.");
        return;
      }
    }
    await supabase.from("lores").update({ status, motivo }).eq("id", id);
    fetchAllLores();
    if (modalOpen) setModalOpen(false);
  };

  const updateVipTag = async (id, newTag) => {
    await supabase.from("lores").update({ vip_tag: newTag === "Nenhum" ? null : newTag }).eq("id", id);
    fetchAllLores();
    // Atualiza a lore selecionada no modal, se estiver aberta
    if (selectedLore && selectedLore.id === id) {
      setSelectedLore({ ...selectedLore, vip_tag: newTag === "Nenhum" ? null : newTag });
    }
  };

  const addAdmin = async () => {
    if (!newAdminName.trim()) return alert("Digite um nome de usuário do Discord.");
    const { data, error } = await supabase.from("admins").insert([{ discord_username: newAdminName.trim() }]);
    if (error) {
      alert("Erro ao adicionar admin: " + error.message);
    } else {
      setNewAdminName("");
      fetchAllAdmins();
    }
  };

  const removeAdmin = async (id) => {
    if (!confirm("Tem certeza que deseja remover este administrador?")) return;
    await supabase.from("admins").delete().eq("id", id);
    fetchAllAdmins();
  };

  if (!user) return <div className="main-content"><h1>Acesso negado. Faça login como administrador.</h1></div>;

  return (
    <PageTransition>
      <div className="main-content">
        <div className="admin-container">
          <h1 className="admin-title">👑 Painel Administrativo</h1>
          
          <div className="admin-nav">
            <button 
              className={`admin-nav-btn ${activeTab === "lores" ? "active" : ""}`}
              onClick={() => setActiveTab("lores")}
            >
              Gerenciar Lores
            </button>
            <button 
              className={`admin-nav-btn ${activeTab === "admins" ? "active" : ""}`}
              onClick={() => setActiveTab("admins")}
            >
              Gerenciar Admins
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "lores" && (
              <motion.div key="lores-tab" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lores-management-grid">
                
                <div className="lore-column">
                  <h2>Em Análise</h2>
                  <div className="admin-grid">
                    {pendingLores.length === 0 ? (
                      <p className="no-lores-message">Nenhuma lore pendente.</p>
                    ) : (
                      pendingLores.map(l => (
                        <div key={l.id} className="admin-card">
                          <div className="admin-card-header">
                            <h3>{l.nome}</h3>
                            <span>@{l.discord_tag}</span>
                          </div>
                          <p><strong>Raça:</strong> {l.raca}</p>
                          <div className={`status-badge status--${l.status.toLowerCase()}`}>{l.status}</div>
                          <div className="admin-actions">
                            <button onClick={() => { setSelectedLore(l); setModalOpen(true); }} className="btn-analisar">Analisar</button>
                            <button onClick={() => updateStatus(l.id, "APROVADA")} className="btn-approve">Aprovar</button>
                            <button onClick={() => updateStatus(l.id, "RECUSADA")} className="btn-reject">Recusar</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="lore-column">
                  <h2>Aprovadas</h2>
                  <div className="admin-grid">
                    {approvedLores.length === 0 ? (
                      <p className="no-lores-message">Nenhuma lore aprovada.</p>
                    ) : (
                      approvedLores.map(l => (
                        <div key={l.id} className="admin-card">
                          <div className="admin-card-header">
                            <h3>{l.nome}</h3>
                            <span>@{l.discord_tag}</span>
                          </div>
                          <p><strong>Raça:</strong> {l.raca}</p>
                          <div className={`status-badge status--${l.status.toLowerCase()}`}>{l.status}</div>
                          <div className="admin-actions">
                            <button onClick={() => { setSelectedLore(l); setModalOpen(true); }} className="btn-analisar">Ver Detalhes</button>
                            <button onClick={() => updateStatus(l.id, "PENDENTE")} className="btn-revert">Reverter</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="lore-column">
                  <h2>Recusadas</h2>
                  <div className="admin-grid">
                    {rejectedLores.length === 0 ? (
                      <p className="no-lores-message">Nenhuma lore recusada.</p>
                    ) : (
                      rejectedLores.map(l => (
                        <div key={l.id} className="admin-card">
                          <div className="admin-card-header">
                            <h3>{l.nome}</h3>
                            <span>@{l.discord_tag}</span>
                          </div>
                          <p><strong>Raça:</strong> {l.raca}</p>
                          <div className={`status-badge status--${l.status.toLowerCase()}`}>{l.status}</div>
                          <div className="admin-actions">
                            <button onClick={() => { setSelectedLore(l); setModalOpen(true); }} className="btn-analisar">Ver Detalhes</button>
                            <button onClick={() => updateStatus(l.id, "PENDENTE")} className="btn-revert">Reverter</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </motion.div>
            )}

            {activeTab === "admins" && (
              <motion.div key="admins-tab" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="admin-manage-section">
                <div className="add-admin-form">
                  <h3>Adicionar Novo Admin</h3>
                  <input 
                    type="text" 
                    placeholder="Username do Discord (sem #)" 
                    value={newAdminName}
                    onChange={e => setNewAdminName(e.target.value)}
                  />
                  <button onClick={addAdmin}>Adicionar</button>
                </div>
                <div className="admin-list">
                  <h3>Administradores Atuais</h3>
                  {admins.map(admin => (
                    <div key={admin.id} className="admin-list-item">
                      <span>{admin.discord_username}</span>
                      <button onClick={() => removeAdmin(admin.id)} className="btn-remove-admin">Remover</button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {modalOpen && selectedLore && (
            <div className="modal-overlay" onClick={() => setModalOpen(false)}>
              <motion.div 
                className="modal-content admin-lore-modal" 
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <button className="modal-close" onClick={() => setModalOpen(false)}><X size={24} /></button>
                <h2>Análise de Lore: {selectedLore.nome}</h2>
                <div className="modal-details">
                  <p><strong>Nick:</strong> {selectedLore.nick}</p>
                  <p><strong>Raça:</strong> {selectedLore.raca}</p>
                  <p><strong>Idade:</strong> {selectedLore.idade}</p>
                  <div className={`status-badge status--${selectedLore.status.toLowerCase()}`}>{selectedLore.status}</div>
                </div>
                <div className="modal-historia">
                  <h3>História:</h3>
                  <p>{selectedLore.historia}</p>
                </div>
                {selectedLore.status === "RECUSADA" && selectedLore.motivo && (
                  <div className="profile-motivo-box">
                    <strong>Motivo da Recusa:</strong>
                    <p>{selectedLore.motivo}</p>
                  </div>
                )}
                <div className="admin-modal-actions">
                  <div className="admin-vip-tag">
                    <label>Tag VIP:</label>
                    <select 
                      value={selectedLore.vip_tag || "Nenhum"}
                      onChange={(e) => updateVipTag(selectedLore.id, e.target.value)}
                    >
                      {vipTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
                    </select>
                  </div>
                  <div className="admin-decision-buttons">
                    {selectedLore.status === "PENDENTE" && (
                      <>
                        <button onClick={() => updateStatus(selectedLore.id, "APROVADA")} className="btn-approve">Aprovar Lore</button>
                        <button onClick={() => updateStatus(selectedLore.id, "RECUSADA")} className="btn-reject">Recusar Lore</button>
                      </>
                    )}
                    {(selectedLore.status === "APROVADA" || selectedLore.status === "RECUSADA") && (
                      <button onClick={() => updateStatus(selectedLore.id, "PENDENTE")} className="btn-revert">Reverter para Pendente</button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loadingAdmin, setLoadingAdmin] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('discord_user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      checkAdmin(parsedUser.username)
    } else {
      setLoadingAdmin(false)
    }
  }, [])

  const checkAdmin = async (username) => {
    // Verificamos na coluna correta 'discord_username' conforme o seu banco de dados
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('discord_username', username)
    
    // Se encontrar no banco OU se for o seu usuário principal (garantia extra)
    const isUserAdmin = (data && data.length > 0) || username === 'circoaleorico' || username === 'xaveiroxd'
    
    setIsAdmin(isUserAdmin)
    setLoadingAdmin(false)
    
    if (error) console.error("Erro ao verificar admin:", error)
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
            <Link to="/apoios" className="nav-item" style={{ color: '#FFD700' }}><span>✨ Apoios</span></Link>
            {!loadingAdmin && isAdmin && <Link to="/admin" className="nav-item" style={{ color: '#f0a500' }}><span>👑 Admin</span></Link>}
            <SidebarDivider />
            {user ? (
              <button className="sidebar-login-btn" onClick={() => { localStorage.removeItem('discord_user'); window.location.href = '/'; }}>Sair</button>
            ) : (
              <a href={`https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`} className="sidebar-login-btn" style={{ textDecoration: 'none', textAlign: 'center', background: '#5865F2', display: 'block' }}>Login com Discord</a>
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
          <Route path="/apoios" element={<Apoios />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
