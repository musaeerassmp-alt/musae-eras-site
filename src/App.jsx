import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Music, Users, Search, LogOut, User, BookOpen, PenTool, ShieldCheck, ClipboardList, X, Heart, Zap, Sparkles, Map, UserCheck, DollarSign, Star } from 'lucide-react';
import Apoios from './Apoios';
import './App.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const REDIRECT_URI = window.location.origin + '/login';

const SidebarDivider = () => (
  <div className="sidebar-divider">
    <div className="divider-line"></div>
    <Music size={16} className="divider-icon" />
    <div className="divider-line"></div>
  </div>
);

export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    style={{ width: '100%' }}
  >
    {children}
  </motion.div>
);

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
];

const Home = () => {
  const [frase, setFrase] = useState({ texto: '', autor: '' });
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * FRASES_FILOSOFICAS.length);
    setFrase(FRASES_FILOSOFICAS[randomIndex]);
  }, []);
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
  );
};

const Forum = () => {
    return <PageTransition><div>Fórum</div></PageTransition>;
};

const CriarFicha = ({ user }) => {
  const [formData, setFormData] = useState({
    nick: '',
    raca: 'Humanos',
    idade: '',
    historia: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Você precisa estar logado para enviar uma ficha.');
      return;
    }

    const { error } = await supabase.from('lores').insert([
      {
        ...formData,
        discord_id: user.id,
        discord_tag: user.username,
        status: 'PENDENTE'
      }
    ]);

    if (error) {
      console.error('Erro ao enviar ficha:', error);
      alert('Ocorreu um erro ao enviar sua ficha. Tente novamente.');
    } else {
      alert('Ficha enviada com sucesso para análise!');
      navigate('/perfil');
    }
  };

  return (
    <PageTransition>
      <div className="main-content ficha-form-container">
        <h2>Componha sua Obra</h2>
        <form onSubmit={handleSubmit} className="ficha-form">
          <input type="text" name="nick" placeholder="Nick do Personagem" value={formData.nick} onChange={handleChange} required />
          <select name="raca" value={formData.raca} onChange={handleChange} required>
            <option value="Humanos">Humanos</option>
            <option value="Anjos">Anjos</option>
            <option value="Demônios">Demônios</option>
            <option value="Quimeras">Quimeras</option>
            <option value="Aquarianos">Aquarianos</option>
          </select>
          <input type="number" name="idade" placeholder="Idade" value={formData.idade} onChange={handleChange} required />
          <textarea name="historia" placeholder="História do Personagem" value={formData.historia} onChange={handleChange} required />
          <button type="submit">Enviar para Análise</button>
        </form>
      </div>
    </PageTransition>
  );
};

const Profile = ({ user }) => {
  const [lore, setLore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vipTier, setVipTier] = useState("Nenhum");

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch Lore
      const { data: loreData, error: loreError } = await supabase
        .from('lores')
        .select('*')
        .eq('discord_id', user.id)
        .single();

      if (loreError && loreError.code !== 'PGRST116') {
        console.error('Erro ao buscar lore:', loreError);
      } else {
        setLore(loreData);
      }

      // Fetch VIP status
      const { data: vipData, error: vipError } = await supabase
        .from('vips')
        .select('tier')
        .eq('discord_username', user.username)
        .single();

      if (vipError && vipError.code !== 'PGRST116') {
          console.error("Error fetching VIPs:", vipError);
      } else if (vipData) {
          setVipTier(vipData.tier);
      }

      setLoading(false);
    };

    fetchProfileData();
  }, [user]);

  if (loading) {
    return <PageTransition><div>Carregando perfil...</div></PageTransition>;
  }

  if (!user) {
    return <PageTransition><div>Por favor, faça login para ver seu perfil.</div></PageTransition>;
  }

  return (
    <PageTransition>
      <div className="main-content profile-container">
        <h2>Perfil de {user.username}</h2>
        {vipTier && vipTier !== "Nenhum" && <span className={`vip-tag vip--${vipTier.toLowerCase()}`}>{vipTier}</span>}
        {lore ? (
          <div className="lore-details">
            <h3>{lore.nick}</h3>
            <p>Raça: {lore.raca}</p>
            <p>Idade: {lore.idade}</p>
            <p>Status: <span className={`status-badge status--${lore.status.toLowerCase()}`}>{lore.status}</span></p>
            {lore.motivo && <p className="rejection-reason">Motivo da Recusa: {lore.motivo}</p>}
            <p>História: {lore.historia}</p>
          </div>
        ) : (
          <p>Você ainda não enviou sua ficha. <Link to="/criar-ficha">Crie sua obra agora!</Link></p>
        )}
      </div>
    </PageTransition>
  );
};

const AdminPanel = ({ user }) => {
  const [activeAdminTab, setActiveAdminTab] = useState('lores');
  const [lores, setLores] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [newAdminName, setNewAdminName] = useState('');
  const [selectedLore, setSelectedLore] = useState(null);
  const [vips, setVips] = useState([]);
  const [newVipUsername, setNewVipUsername] = useState('');
  const [newVipTier, setNewVipTier] = useState('Nenhum');
  const vipTiers = ["Nenhum", "VIP", "VIP+", "VIP++", "Beta"];

  const fetchAllLores = useCallback(async () => {
    const { data, error } = await supabase.from('lores').select('*');
    if (error) {
      console.error('Error fetching lores:', error);
      alert('Erro ao carregar as lores.');
    } else {
      setLores(data);
    }
  }, []);

  const fetchAdmins = useCallback(async () => {
    const { data, error } = await supabase.from('admins').select('*');
    if (error) {
      console.error('Error fetching admins:', error);
    } else {
      setAdmins(data);
    }
  }, []);

  const fetchVips = useCallback(async () => {
    const { data, error } = await supabase.from('vips').select('*');
    if (error) {
        console.error('Error fetching VIPs:', error);
    } else {
        setVips(data);
    }
  }, []);

  useEffect(() => {
    fetchAllLores();
    fetchAdmins();
    fetchVips();
  }, [fetchAllLores, fetchAdmins, fetchVips]);

  const updateLoreStatus = async (loreId, status, motivo = null) => {
    const { error } = await supabase
      .from('lores')
      .update({ status, motivo })
      .eq('id', loreId);
    if (error) {
      console.error('Error updating lore status:', error);
    } else {
      fetchAllLores();
      setSelectedLore(null);
    }
  };

  const handleRecusar = (loreId) => {
    const motivo = prompt('Por favor, insira o motivo da recusa:');
    if (motivo) {
      updateLoreStatus(loreId, 'RECUSADA', motivo);
    }
  };

  const addAdmin = async () => {
    if (!newAdminName) return;
    const { error } = await supabase.from('admins').insert([{ discord_username: newAdminName }]);
    if (error) {
      console.error('Error adding admin:', error);
    } else {
      setNewAdminName('');
      fetchAdmins();
    }
  };

  const removeAdmin = async (adminId) => {
    const { error } = await supabase.from('admins').delete().eq('id', adminId);
    if (error) {
      console.error('Error removing admin:', error);
    } else {
      fetchAdmins();
    }
  };

  const addOrUpdateVip = async () => {
    if (!newVipUsername) {
        alert('Por favor, insira um username.');
        return;
    }
    const { error } = await supabase
        .from('vips')
        .upsert({ discord_username: newVipUsername, tier: newVipTier }, { onConflict: 'discord_username' });

    if (error) {
        console.error('Error adding/updating VIP:', error);
        alert('Erro ao adicionar/atualizar VIP.');
    } else {
        alert(`VIP para ${newVipUsername} atualizado para ${newVipTier}!`);
        setNewVipUsername('');
        setNewVipTier('Nenhum');
        fetchVips();
    }
  };

  const removeVip = async (username) => {
      if (!confirm(`Tem certeza que deseja remover o VIP de ${username}?`)) return;
      const { error } = await supabase.from('vips').delete().eq('discord_username', username);
      if (error) {
          console.error('Error removing VIP:', error);
          alert('Erro ao remover VIP.');
      } else {
          alert(`VIP de ${username} removido com sucesso!`);
          fetchVips();
      }
  };

  const renderLoreCard = (lore) => (
    <div key={lore.id} className="lore-card">
      <h4>{lore.nick} <span className="discord-tag">@{lore.discord_tag}</span></h4>
      <p>Raça: {lore.raca}</p>
      <div className="lore-card-actions">
        <button className="btn-analisar" onClick={() => setSelectedLore(lore)}>Analisar</button>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="main-content admin-panel">
        <h1>👑 Painel Administrativo</h1>
        <div className="admin-tabs">
            <button className={`admin-tab-btn ${activeAdminTab === 'lores' ? 'active' : ''}`} onClick={() => setActiveAdminTab('lores')}>Gerenciar Lores</button>
            <button className={`admin-tab-btn ${activeAdminTab === 'admins' ? 'active' : ''}`} onClick={() => setActiveAdminTab('admins')}>Gerenciar Admins</button>
            <button className={`admin-tab-btn ${activeAdminTab === 'vips' ? 'active' : ''}`} onClick={() => setActiveAdminTab('vips')}>Gerenciar VIPs</button>
        </div>

        {activeAdminTab === 'lores' && (
            <div className="lores-management-grid">
                <div className="lore-column">
                    <h3>Em Análise</h3>
                    {lores.filter(l => l.status !== 'APROVADA' && l.status !== 'RECUSADA').map(renderLoreCard)}
                </div>
                <div className="lore-column">
                    <h3>Aprovadas</h3>
                    {lores.filter(l => l.status === 'APROVADA').map(renderLoreCard)}
                </div>
                <div className="lore-column">
                    <h3>Recusadas</h3>
                    {lores.filter(l => l.status === 'RECUSADA').map(renderLoreCard)}
                </div>
            </div>
        )}

        {activeAdminTab === 'admins' && (
            <div className="admin-section">
                <h3>Gerenciar Administradores</h3>
                <div className="add-admin-section">
                    <input type="text" placeholder="Username do Discord (sem #)" value={newAdminName} onChange={(e) => setNewAdminName(e.target.value)} />
                    <button onClick={addAdmin}>Adicionar</button>
                </div>
                <ul className="admin-list">
                    {admins.map(admin => <li key={admin.id}>{admin.discord_username} <button onClick={() => removeAdmin(admin.id)}>Remover</button></li>)}
                </ul>
            </div>
        )}

        {activeAdminTab === 'vips' && (
            <div className="admin-section">
                <h3>Gerenciar VIPs</h3>
                <div className="add-vip-section">
                    <input type="text" placeholder="Username do Discord (sem #)" value={newVipUsername} onChange={(e) => setNewVipUsername(e.target.value)} />
                    <select value={newVipTier} onChange={(e) => setNewVipTier(e.target.value)}>
                        {vipTiers.map(tier => <option key={tier} value={tier}>{tier}</option>)}
                    </select>
                    <button onClick={addOrUpdateVip}>Adicionar/Atualizar</button>
                </div>
                <ul className="vip-list">
                    {vips.map(vip => <li key={vip.discord_username}>{vip.discord_username} - {vip.tier} <button onClick={() => removeVip(vip.discord_username)}>Remover</button></li>)}
                </ul>
            </div>
        )}

        {selectedLore && (
          <div className="modal-backdrop" onClick={() => setSelectedLore(null)}>
            <div className="admin-lore-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header-lore">
                    <h2>Análise de Lore: {selectedLore.nick}</h2>
                    <button className="close-modal-btn" onClick={() => setSelectedLore(null)}><X size={24} /></button>
                </div>
                <div className="modal-content-lore">
                    <div className="modal-info-grid">
                        <div className="info-item"><User size={16}/><strong>Nick:</strong> {selectedLore.nick}</div>
                        <div className="info-item"><ShieldCheck size={16}/><strong>Raça:</strong> {selectedLore.raca}</div>
                        <div className="info-item"><Star size={16}/><strong>Idade:</strong> {selectedLore.idade}</div>
                    </div>
                    <div className="modal-historia-content">
                        <div className="historia-header"><BookOpen size={18}/><h3>História</h3></div>
                        <p>{selectedLore.historia}</p>
                    </div>
                    {selectedLore.status === 'RECUSADA' && selectedLore.motivo && (
                        <div className="modal-motivo-recusa">
                            <div className="motivo-header"><X size={18}/><h3>Motivo da Recusa</h3></div>
                            <p>{selectedLore.motivo}</p>
                        </div>
                    )}
                </div>
                <div className="modal-actions">
                    <button className="btn-aprovar" onClick={() => updateLoreStatus(selectedLore.id, 'APROVADA')}>Aprovar Lore</button>
                    <button className="btn-recusar" onClick={() => handleRecusar(selectedLore.id)}>Recusar Lore</button>
                </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleLogin = async () => {
      const params = new URLSearchParams(location.hash.substring(1));
      const accessToken = params.get('access_token');

      if (accessToken) {
        const { data: { user } } = await supabase.auth.getUser(accessToken);
        if (user) {
          const userData = {
            id: user.id,
            email: user.email,
            username: user.user_metadata.custom_claims.global_name,
            avatar: user.user_metadata.avatar_url,
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          navigate('/perfil');
        }
      }
    };
    handleLogin();
  }, [location, navigate, setUser]);

  return <div>Logando...</div>;
};

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user && (user.username === 'circoaleorico' || user.username === 'xaveiroxd')) {
        setIsAdmin(true);
        return;
      }
      if (user) {
        const { data, error } = await supabase
          .from('admins')
          .select('discord_username')
          .eq('discord_username', user.username);
        if (data && data.length > 0) {
          setIsAdmin(true);
        }
      }
    };
    checkAdmin();
  }, [user]);

  const handleLogin = () => {
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify%20email`;
    window.location.href = discordAuthUrl;
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <aside className="sidebar">
          <div className="sidebar-header">
            <img src="/logo.png" alt="Musae Eras Logo" className="logo" />
            <h2>Musae Eras</h2>
          </div>
          <nav className="sidebar-nav">
            <Link to="/perfil"><User size={18} /> Perfil</Link>
            <Link to="/forum"><BookOpen size={18} /> Fórum</Link>
            <Link to="/criar-ficha"><PenTool size={18} /> Componha sua Obra</Link>
            <Link to="/apoios" className="apoios-link"><Sparkles size={18} /> Apoios</Link>
            {isAdmin && <Link to="/admin">👑 Admin</Link>}
          </nav>
          <div className="sidebar-footer">
            {user ? (
              <button onClick={handleLogout} className="sidebar-btn-logout"><LogOut size={18} /> Sair</button>
            ) : (
              <button onClick={handleLogin} className="sidebar-btn-login">Conectar com Discord</button>
            )}
          </div>
        </aside>
        <main className="main-view">
          <AnimatePresence mode="wait">
            <Routes location={useLocation()} key={useLocation().pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/criar-ficha" element={<CriarFicha user={user} />} />
              <Route path="/perfil" element={<Profile user={user} />} />
              <Route path="/apoios" element={<Apoios />} />
              <Route path="/admin" element={isAdmin ? <AdminPanel user={user} /> : <Home />} />
              <Route path="/login" element={<Login setUser={setUser} />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
