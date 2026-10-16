import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars
import { createClient } from '@supabase/supabase-js'
import { Music, Search, LogOut, User, BookOpen, PenTool, ShieldCheck, ClipboardList, X, Heart, Zap, Map, DollarSign, Star } from 'lucide-react'
import Apoios from './Apoios'
import PageTransition from './PageTransition'
import './App.css'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID
const REDIRECT_URI = window.location.origin + '/login'

const SidebarDivider = () => (
  <div className="sidebar-divider">
    <div className="divider-line"></div>
    <Music size={16} className="divider-icon" />
    <div className="divider-line"></div>
  </div>
)

const SocialLinks = () => (
  <nav className="social-links" aria-label="Redes sociais do Musae Eras">
    <a
      href="https://x.com/MusaeErasSMP"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Musae Eras no X (Twitter)"
      title="X (Twitter)"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93zM17.61 20.64h2.04L6.49 3.24H4.3z" />
      </svg>
    </a>
    <a
      href="https://www.tiktok.com/@musaeerassmp?is_from_webapp=1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Musae Eras no TikTok"
      title="TikTok"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.33V2h-3.4v13.67a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.3 0 .6.05.9.14v-3.47a6.4 6.4 0 0 0-.9-.07 6.3 6.3 0 1 0 6.3 6.3V9.02a8.2 8.2 0 0 0 4.8 1.54V7.16c-.37 0-.73-.04-1.03-.12Z" />
      </svg>
    </a>
  </nav>
)

const getVipClassName = (vipTag) => {
  const normalizedTag = (vipTag || 'Nenhum')
    .toLowerCase()
    .replace(/\+\+/g, '-plus-plus')
    .replace(/\+/g, '-plus')

  return `vip-tag vip-tag--${normalizedTag}`
}

const getBetaClassName = () => 'vip-tag vip-tag--beta'

const getVipDisplayValue = (vipTag) => vipTag || 'Nenhum'

const VIP_TIER_OPTIONS = ['Nenhum', 'VIP', 'VIP+', 'VIP++']

const STATUS_LABELS = {
  PENDENTE: 'PENDENTE',
  EM_ENTREVISTA: 'EM ENTREVISTA',
  APROVADA: 'APROVADA',
  RECUSADA: 'RECUSADA'
}

const INTERVIEW_NOTICE = 'Você foi aprovado para a segunda fase da entrevista. Verifique nossos avisos no Discord ou abra um ticket caso os dias de entrevista já tenham passado.'

const AdminLoreCard = ({ lore, onOpen, onUpdateStatus, onDeleteLore }) => (
  <div className="admin-card">
    <div className="admin-card-header">
      <h3>{lore.nome}</h3>
      <span>@{lore.discord_tag}{lore.beta ? ' • Beta' : ''}</span>
    </div>
    <p><strong>Raça:</strong> {lore.raca}</p>
    {lore.discord_id && <p><strong>ID da conta:</strong> {lore.discord_id}</p>}
    <div className="admin-vip-tags">
      <span className={getVipClassName(lore.vip_tag)}>{getVipDisplayValue(lore.vip_tag)}</span>
      {lore.beta && <span className={getBetaClassName()}>Beta</span>}
    </div>
    <div className={`status-badge status--${lore.status.toLowerCase()}`}>{STATUS_LABELS[lore.status] || lore.status}</div>
    <div className="admin-actions">
      <button onClick={() => onOpen(lore)} className="btn-analisar">{lore.status === 'PENDENTE' ? 'Analisar' : 'Ver Detalhes'}</button>
      {lore.status === 'PENDENTE' && (
        <>
          <button onClick={() => onUpdateStatus(lore.id, 'EM_ENTREVISTA')} className="btn-approve">Aprovar história</button>
          <button onClick={() => onUpdateStatus(lore.id, 'RECUSADA')} className="btn-reject">Recusar</button>
        </>
      )}
      {lore.status === 'EM_ENTREVISTA' && (
        <button onClick={() => onUpdateStatus(lore.id, 'APROVADA')} className="btn-approve">Aprovar entrevista</button>
      )}
      {(lore.status === 'APROVADA' || lore.status === 'RECUSADA' || lore.status === 'EM_ENTREVISTA') && (
        <button onClick={() => onUpdateStatus(lore.id, 'PENDENTE')} className="btn-revert">Reverter</button>
      )}
      <button onClick={() => onDeleteLore(lore.id)} className="btn-delete-lore">Deletar</button>
    </div>
  </div>
)

const FRASES_FILOSOFICAS = [
  { texto: 'A alegria não está nas coisas, está em nós.', autor: 'Richard Wagner' },
  { texto: 'O coração tem razões que a própria razão desconhece.', autor: 'Blaise Pascal' },
  { texto: 'Onde há amor, há vida.', autor: 'Mahatma Gandhi' },
  { texto: 'A música exprime o que não pode ser dito e sobre o qual é impossível calar.', autor: 'Victor Hugo' },
  { texto: 'A felicidade é a única coisa que se duplica quando se compartilha.', autor: 'Albert Schweitzer' },
  { texto: 'A beleza das coisas existe no espírito de quem as contempla.', autor: 'David Hume' },
  { texto: 'O homem é o que ele sente.', autor: 'Aristóteles' },
  { texto: 'A melancolia é a felicidade de ser triste.', autor: 'Victor Hugo' },
  { texto: 'Sentir é criar. Sentir é pensar sem ideias.', autor: 'Fernando Pessoa' },
  { texto: 'A amizade é uma alma que habita em dois corpos.', autor: 'Aristóteles' }
]

const Home = () => {
  const [frase] = useState(() => {
    const randomIndex = Math.floor(Math.random() * FRASES_FILOSOFICAS.length)
    return FRASES_FILOSOFICAS[randomIndex]
  })

  return (
    <PageTransition>
      <div className="main-content home-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="home-hero"
        >
          <img
            src="/logonovaSemfundo.png"
            alt="Logo Musae Eras"
            className="home-logo"
          />
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

const humanOntology = {
  title: 'Cinco caminhos, uma existência',
  introduction: 'Os 𝓗𝓾𝓶𝓪𝓷𝓸𝓼 não possuem uma única entidade que os represente. Sua natureza é marcada pela diversidade de caminhos, e por isso cinco entidades se relacionam diretamente com eles: 𝓐 𝓕𝓸𝓻𝓽𝓾𝓷𝓪, 𝓞 𝓔𝓼𝓬𝓻𝓲𝓫𝓪, 𝓐 𝓟𝓮𝓻𝓮𝓰𝓻𝓲𝓷𝓪, 𝓞 𝓕𝓮𝓻𝓻𝓮𝓲𝓻𝓸 e 𝓐 𝓜𝓪́𝓼𝓬𝓪𝓻𝓪. Cada uma representa uma possibilidade da existência humana, aquilo que pode ser encontrado, criado, percorrido, construído ou escondido ao longo de uma vida.',
  entities: [
    {
      name: '𝓐 𝓕𝓸𝓻𝓽𝓾𝓷𝓪',
      description: [
        'Representa o acaso e as possibilidades. Ela não determina o destino dos Humanos, mas rege os pequenos desvios que podem transformar completamente uma vida.',
        'Para alguns, sua presença se manifesta como sorte; para outros, como uma sucessão de acontecimentos inesperados. A Fortuna não escolhe quem merece prosperar. Ela apenas abre portas, cabe ao indivíduo decidir se irá atravessá-las.'
      ],
      poem: [
        'As coisas que errei na vida',
        'São as que acharei na morte,',
        'Porque a vida é dividida',
        'Entre quem sou e a sorte.',
        'As coisas que a Sorte deu',
        'Levou-as ela consigo,',
        'Mas as coisas que sou eu',
        'Guardei-as todas comigo.'
      ],
      poet: 'Fernando Pessoa',
      belief: 'A Fortuna não exige templos ou cerimônias elaboradas, pois sua natureza está no acaso e nas oportunidades. Seus devotos costumam oferecer pequenas moedas, objetos encontrados durante suas jornadas ou presentes adquiridos em momentos de sorte. Muitos acreditam que compartilhar parte daquilo que receberam é uma maneira de demonstrar gratidão, enquanto outros simplesmente depositam uma moeda em encruzilhadas e seguem seus caminhos, sem esperar uma resposta.'
    },
    {
      name: '𝓞 𝓔𝓼𝓬𝓻𝓲𝓫𝓪',
      description: [
        'Representa o conhecimento, a memória e aquilo que permanece. É ligada às histórias registradas, aos nomes preservados e às verdades que sobrevivem àqueles que as descobriram.',
        'Para os Humanos, sua existência lembra que uma vida pode terminar, mas aquilo que foi escrito pode continuar. O Escriba observa, registra e guarda, não para julgar o passado, mas para impedir que ele seja completamente esquecido.'
      ],
      poem: [
        'Amar o perdido, deixa confundido este coração.',
        'Nada pode o olvido contra o sem sentido apelo do Não.',
        'As coisas tangíveis tornam-se insensíveis à palma da mão.',
        'Mas as coisas findas, muito mais que lindas, essas ficarão.'
      ],
      poet: 'Carlos Drummond de Andrade',
      belief: 'O Escriba é louvado através da preservação do conhecimento e da memória. Seus devotos mantêm bibliotecas, registram histórias, restauram documentos antigos e escrevem os nomes daqueles que não devem ser esquecidos. Para ele, o maior ato de devoção não é construir um templo, mas impedir que o conhecimento desapareça. Destruir deliberadamente registros importantes é considerado uma das maiores ofensas que se pode cometer contra sua entidade.'
    },
    {
      name: '𝓐 𝓟𝓮𝓻𝓮𝓰𝓻𝓲𝓷𝓪',
      description: [
        'Representa a jornada, a descoberta e a mudança. Ela está presente em todo Humano que abandona aquilo que conhece para buscar algo além de seus próprios limites.',
        'Sua influência está nos viajantes, exploradores e naqueles que simplesmente desejam descobrir quem são. Para ela, nenhum caminho é verdadeiramente perdido enquanto ainda houver algo a aprender.'
      ],
      poem: [
        'Quero andar pela superfície,',
        'caminhar o meu caminho,',
        'ter o chão firme por onde passar,',
        'ver as águas limpas dos riachos,',
        'sejam ouvidas batendo',
        'de encontro às pedras,',
        'abundantes, claras e permanentes!...'
      ],
      poet: 'Luiz Romeu Oliboni',
      belief: 'A Peregrina é honrada através das jornadas. Seus devotos costumam partir em viagens para conhecer terras desconhecidas, visitar lugares históricos ou simplesmente abandonar a segurança do familiar em busca de novas experiências. Não existem destinos obrigatórios nem caminhos sagrados universais: o importante é partir com disposição para aprender. Alguns viajantes deixam pequenas lembranças nos lugares por onde passam, enquanto outros consideram que retornar transformados já é a maior oferenda possível.'
    },
    {
      name: '𝓞 𝓕𝓮𝓻𝓻𝓮𝓲𝓻𝓸',
      description: [
        'Representa a criação, o trabalho e a transformação. É aquele que molda aquilo que existe para criar aquilo que ainda não existe.',
        'Sua essência está presente nas mãos dos artesãos, construtores e inventores, mas também em qualquer Humano que transforme sua própria realidade através do esforço. O Ferreiro ensina que nada precisa permanecer exatamente como foi encontrado.'
      ],
      poem: [
        'Mudam-se os tempos, mudam-se as vontades,',
        'Muda-se o ser, muda-se a confiança;',
        'Todo o mundo é composto de mudança,',
        'Tomando sempre novas qualidades.',
        '',
        'Continuamente vemos novidades,',
        'Diferentes em tudo da esperança;',
        'Do mal ficam as mágoas na lembrança,',
        'E do bem, se algum houve, as saudades.',
        '',
        'O tempo cobre o chão de verde manto,',
        'Que já coberto foi de neve fria,',
        'E enfim converte em choro o doce canto.',
        '',
        'E, afora este mudar-se cada dia,',
        'Outra mudança faz de mor espanto:',
        'Que não se muda já como soía.'
      ],
      poet: 'Luís de Camões',
      belief: 'O Ferreiro recebe devoção através do trabalho, da criação e do aperfeiçoamento. Artesãos dedicam suas melhores obras à entidade, enquanto construtores gravam seu símbolo em fundações e oficinas. Em algumas comunidades, é costume oferecer a primeira peça produzida por um aprendiz ou preservar ferramentas utilizadas por gerações. Não é necessário construir igrejas em seu nome: criar algo duradouro, útil ou extraordinário já representa uma forma de louvor.'
    },
    {
      name: '𝓐 𝓜𝓪́𝓼𝓬𝓪𝓻𝓪',
      description: [
        'Representa a identidade, os segredos que os Humanos escolhem apresentar ao mundo.',
        'Todo Humano carrega diferentes versões de si mesmo. Algumas são mostradas, outras são escondidas. A Máscara não representa necessariamente a mentira, mas a capacidade de escolher quem se é diante de cada olhar.',
        'Ela existe entre o verdadeiro e o aparente, entre aquilo que alguém é e aquilo que deseja que os outros enxerguem.'
      ],
      poem: [
        'Às vezes nem eu mesmo sei quem sou.',
        "às vezes sou 'o meu queridinho',",
        "às vezes sou 'moleque malcriado'.",
        'Para mim tem vezes que eu sou rei, herói voador,',
        'caubói lutador, jogador campeão.',
        'às vezes sou pulga, sou mosca também,',
        'que voa e se esconde de medo e vergonha.',
        'Às vezes eu sou Hércules, Sansão vencedor,',
        'peito de aço goleador!',
        'Mas o que importa o que pensam de mim?',
        'Eu sou quem sou, eu sou eu, sou assim, sou menino.'
      ],
      poet: 'Pedro Bandeira',
      belief: 'A Máscara é louvada através do mistério, da expressão e da preservação dos segredos. Seus devotos utilizam máscaras em cerimônias, deixam presentes em locais discretos e mantêm pequenos santuários escondidos dos olhos alheios. Alguns acreditam que revelar voluntariamente um segredo importante durante um ritual é uma demonstração de confiança; outros preferem permanecer anônimos, considerando que a devoção perde parte de seu significado quando realizada para receber reconhecimento.'
    }
  ]
}

const angelOntology = {
  title: 'Cinco princípios da força angelical',
  introduction: 'Os 𝓐𝓷𝓳𝓸𝓼 possuem cinco entidades que representam os princípios fundamentais de sua existência: 𝓐 𝓑𝓪𝓵𝓪𝓷𝓬̧𝓪, 𝓞 𝓒𝓸𝓻𝓸, 𝓐 𝓥𝓲𝓰𝓲́𝓵𝓲𝓪, 𝓞 𝓥𝓮𝓻𝓮𝓭𝓲𝓽𝓸 e 𝓐 𝓐𝓾𝓻𝓸𝓻𝓪. Cada uma representa uma vertente da força angelical, desde o equilíbrio e a ordem até a proteção, o julgamento e a esperança de um novo começo.',
  entities: [
    {
      name: '𝓐 𝓑𝓪𝓵𝓪𝓷𝓬̧𝓪',
      description: [
        'É o equilíbrio, a justiça e a igualdade diante das leis da Criação. A Balança existe para lembrar aos Anjos que nenhuma ação acontece sem consequência e que nenhum ser deve estar acima daquilo que mantém o mundo em equilíbrio.',
        'Ela não representa bondade ou crueldade, mas a necessidade de pesar cada ato antes de determinar seu valor. Para os Anjos, a Balança é a lembrança de que até aqueles que julgam também estão sujeitos às leis que protegem.'
      ],
      poem: [
        'Justiça! E vós, povos,',
        'Que a justiça adorais,',
        'Não deixeis que o crime',
        'Se erga contra a lei!'
      ],
      poet: 'Castro Alves',
      belief: 'A Balança é honrada através da justiça e da imparcialidade. Seus devotos procuram resolver conflitos sem favorecer amigos ou prejudicar adversários, além de construir tribunais e santuários onde decisões importantes possam ser tomadas. Em seus templos, é comum encontrar balanças esculpidas em pedra ou metal. Para a entidade, uma decisão justa tomada em silêncio pode ter mais valor do que um sacrifício realizado em seu nome.'
    },
    {
      name: '𝓞 𝓒𝓸𝓻𝓸',
      description: [
        'É a união, a harmonia e a força encontrada na coletividade. Cada Anjo possui sua própria existência, mas nenhum deles deveria existir completamente separado dos demais.',
        'O Coro simboliza a reunião dessas diferentes vozes em um mesmo propósito, transformando aquilo que seria apenas uma voz em uma presença capaz de alcançar toda a Criação. Para os Anjos, cantar juntos é também lembrar que nenhuma existência precisa carregar sozinha o peso de sua missão.'
      ],
      poem: [
        'Minha terra tem palmeiras,',
        'Onde canta o Sabiá;',
        'As aves, que aqui gorjeiam,',
        'Não gorjeiam como lá.',
        '',
        'Nosso céu tem mais estrelas,',
        'Nossas várzeas têm mais flores,',
        'Nossos bosques têm mais vida,',
        'Nossa vida mais amores.'
      ],
      poet: 'Gonçalves Dias',
      belief: 'O Coro recebe louvor através da música, da união e das orações coletivas. Seus devotos organizam cânticos, corais e cerimônias em que diferentes vozes se unem em uma única composição. Suas igrejas costumam possuir acústica cuidadosamente planejada para que nenhuma voz se perca completamente entre as demais. Cantar sozinho também é aceito, desde que a intenção seja sincera, mas acredita-se que a devoção alcança sua expressão mais elevada quando muitos participam em harmonia.'
    },
    {
      name: '𝓐 𝓥𝓲𝓰𝓲́𝓵𝓲𝓪',
      description: [
        'É a proteção, a atenção e o dever de permanecer desperto. A Vigília é aquela que observa quando todos os outros descansam, mantendo seus olhos voltados para aquilo que pode ameaçar a ordem.',
        'Ela não está presente apenas no combate, mas também na espera silenciosa, no cuidado e na percepção dos menores sinais. Para os Anjos, vigiar é aceitar que proteger alguém significa estar presente mesmo quando nenhuma ameaça parece existir.'
      ],
      poem: [
        'Debruçados do céu... a noite e os astros',
        'Seguiam da peleja o incerto fado...',
        'Era a tocha, o fuzil avermelhado!',
        'Era o circo de Roma — o vasto chão!',
        '',
        'Por palmas, o troar da artilharia!',
        'Por feras, os canhões negros rugiam!',
        'Por atletas, dois povos se batiam!',
        'Enorme anfiteatro, era a amplidão!'
      ],
      poet: 'Castro Alves',
      belief: 'A Vigília é honrada através da proteção e do dever. Seus devotos mantêm postos de observação, protegem viajantes e permanecem atentos às comunidades sob seus cuidados. Alguns templos mantêm lanternas acesas durante toda a noite como símbolo de sua presença constante. Para a Vigília, não existem presentes obrigatórios: vigiar quando ninguém mais está disposto a fazê-lo e proteger aqueles que não podem se proteger são as formas mais respeitadas de devoção.'
    },
    {
      name: '𝓞 𝓥𝓮𝓻𝓮𝓭𝓲𝓽𝓸',
      description: [
        'É a decisão, a sentença e o peso das consequências. O Veredito existe depois do julgamento, quando aquilo que foi observado precisa finalmente receber uma resposta.',
        'Ele não age pela raiva ou pelo desejo de vingança, mas pela responsabilidade de determinar aquilo que deverá acontecer diante de uma transgressão. Para os Anjos, representa o momento em que a dúvida termina e a justiça precisa transformar-se em ação.'
      ],
      poem: [
        'Não! Não eram dois povos, que abalavam',
        'Naquele instante o solo ensanguentado...',
        'Era o porvir, em frente do passado,',
        'A liberdade, em frente à escravidão.',
        '',
        'Era a luta das águias, e do abutre,',
        'A revolta do pulso, contra os ferros,',
        'O pugilato da razão, com os erros,',
        'O duelo da treva, e do clarão!'
      ],
      poet: 'Castro Alves',
      belief: 'O Veredito é louvado através do cumprimento das decisões e da responsabilidade pelos próprios atos. Seus devotos preservam registros de julgamentos, erguem monumentos em locais onde decisões históricas foram tomadas e realizam cerimônias solenes antes de sentenças importantes. Não costumam oferecer riquezas, pois acreditam que presentes podem comprometer a imparcialidade. Para eles, o maior tributo é aceitar as consequências de uma decisão justa, mesmo quando ela contraria seus próprios interesses.'
    },
    {
      name: '𝓐 𝓐𝓾𝓻𝓸𝓻𝓪',
      description: [
        'É o renascimento, a esperança e o início de um novo ciclo. A Aurora surge quando a escuridão começa a desaparecer, trazendo consigo a possibilidade de que aquilo que terminou não seja necessariamente o fim de todas as coisas.',
        'Ela não apaga a noite nem desfaz aquilo que aconteceu, mas anuncia que existe novamente luz para aqueles que desejam continuar. Para os Anjos, é o símbolo da esperança que permanece mesmo depois dos momentos mais sombrios.'
      ],
      poem: [
        'Quando as estrelas surgem na tarde, surge a esperança...',
        'Toda alma triste no seu desgosto sonha um Messias:',
        'Quem sabe? o acaso, na sorte esquiva, traz: a mudança',
        'E enche de mundos as existências que eram vazias!',
        '',
        'Quando as estrelas brilham mais vivas, brilha a esperança...',
        'Os olhos fulgem; loucas, ensaiam as asas frias:',
        'Tantos amores há pela terra, que a mão alcança!',
        'E há tantos astros, com outras vidas, para outros dias!'
      ],
      poet: 'Olavo Bilac',
      belief: 'A Aurora recebe devoção através da esperança e dos recomeços. Seus seguidores costumam realizar orações ao nascer do sol, acender velas em momentos difíceis e oferecer flores aos que iniciam uma nova etapa da vida. Seus templos possuem janelas voltadas para o horizonte, permitindo que a primeira luz do dia alcance os altares. Não exige sacrifícios nem grandes oferendas: continuar acreditando na possibilidade de um amanhã melhor é considerado um dos gestos mais sinceros de fé.'
    }
  ]
}

const daemonOntology = {
  title: 'Cinco faces da existência demoníaca',
  introduction: 'Os 𝓓𝓮𝓶𝓸̂𝓷𝓲𝓸𝓼 possuem uma sociedade construída sobre a força, a guerra e a conquista. Para eles, o poder não é apenas um privilégio, mas uma condição que precisa ser demonstrada, defendida e constantemente reafirmada. Aquele que deseja respeito deve provar seu valor, e aquele que deseja governar precisa demonstrar que é capaz de sustentar sua autoridade. Suas cinco entidades são 𝓐 𝓘𝓻𝓪, 𝓞 𝓒𝓸𝓷𝓺𝓾𝓲𝓼𝓽𝓪𝓭𝓸𝓻, 𝓐 𝓛𝓪̂𝓶𝓲𝓷𝓪, 𝓞 𝓢𝓸𝓫𝓮𝓻𝓪𝓷𝓸 e 𝓐 𝓒𝓲𝓷𝔃𝓪. Cada uma representa uma face da existência demoníaca, desde a fúria que desperta o poder até a resistência daqueles que sobrevivem à própria ruína.',
  entities: [
    {
      name: '𝓐 𝓘𝓻𝓪',
      description: [
        'É a fúria, a força e o instinto que despertam diante da adversidade. A Ira existe para lembrar aos Demônios que a fraqueza não precisa ser o fim de ninguém, mas também que a força sem controle pode consumir até mesmo aquele que a carrega.',
        'Ela não representa a violência sem propósito, mas a chama que impulsiona um ser a continuar lutando quando tudo parece perdido. Para os Demônios, a Ira é a prova de que dominar a própria fúria é tão importante quanto vencer um inimigo.'
      ],
      poem: [
        'A cólera é um cavalo fogoso;',
        'quem não o governa,',
        'será por ele arrastado.'
      ],
      poet: 'William Shakespeare',
      belief: 'A Ira é honrada através da força, da resistência e do domínio sobre os próprios impulsos. Seus devotos realizam treinamentos exaustivos, enfrentam desafios físicos e fazem juramentos de nunca abandonar uma luta por medo. Armas utilizadas em batalhas memoráveis podem ser depositadas em seus altares como oferendas. Para a entidade, enfurecer-se é natural; permitir que a própria fúria governe todas as decisões é uma demonstração de fraqueza.'
    },
    {
      name: '𝓞 𝓒𝓸𝓷𝓺𝓾𝓲𝓼𝓽𝓪𝓭𝓸𝓻',
      description: [
        'É a ambição, a conquista e a vontade de superar os próprios limites. O Conquistador existe para lembrar aos Demônios que o poder precisa ser demonstrado por meio de ações, e que nenhum feito grandioso nasce da acomodação.',
        'Ele representa a busca por territórios, vitórias e reconhecimento, mas também o peso de sustentar aquilo que foi conquistado. Para os Demônios, o Conquistador é a lembrança de que vencer é apenas o início da verdadeira provação.'
      ],
      poem: [
        'Quem passa pela vida em branca nuvem,',
        'E em plácido repouso adormece,',
        'Quem não sente o calor da chama viva,',
        'Nem a dor que o coração enobrece.'
      ],
      poet: 'Castro Alves',
      belief: 'O Conquistador é honrado através de feitos grandiosos, desafios superados e vitórias conquistadas por mérito. Seus devotos dedicam campanhas, troféus e territórios conquistados à entidade, além de erguer monumentos para preservar os nomes daqueles que realizaram grandes feitos. Em algumas culturas, guerreiros gravam suas maiores conquistas em placas de metal ou nas paredes de salões de batalha. Promessas vazias não possuem valor para o Conquistador: somente aquilo que foi realizado merece ser oferecido.'
    },
    {
      name: '𝓐 𝓛𝓪̂𝓶𝓲𝓷𝓪',
      description: [
        'É a disciplina, a precisão e o domínio da própria habilidade. A Lâmina existe para lembrar aos Demônios que a força bruta, sozinha, não determina o vencedor, pois até o golpe mais poderoso pode falhar quando executado sem técnica.',
        'Ela representa o aperfeiçoamento constante, a paciência necessária para dominar uma arte e a responsabilidade de saber quando utilizar aquilo que se aprendeu. Para os Demônios, a Lâmina ensina que a verdadeira maestria não está em atacar sem parar, mas em nunca desperdiçar um movimento.'
      ],
      poem: [
        'A mão que executa deve conhecer',
        'O peso daquilo que escolheu fazer;',
        'Pois não há arte no golpe sem propósito,',
        'Nem vitória no gesto sem saber.'
      ],
      poet: 'Careca!',
      belief: 'A Lâmina é honrada através do treinamento, da disciplina e do aperfeiçoamento das próprias habilidades. Seus devotos cuidam de suas armas com grande respeito, dedicam horas à prática de suas técnicas e evitam desperdiçar movimentos em demonstrações vazias. É comum que aprendizes ofereçam à entidade sua primeira arma forjada ou a primeira ferramenta que dominaram por completo. Seus santuários costumam exibir armas históricas, cada uma acompanhada de relatos sobre a habilidade de quem a utilizou. Para a Lâmina, a excelência é uma oferenda maior do que a brutalidade.'
    },
    {
      name: '𝓞 𝓢𝓸𝓫𝓮𝓻𝓪𝓷𝓸',
      description: [
        'É a autoridade, o domínio e o dever de sustentar o próprio poder. O Soberano existe para lembrar aos Demônios que governar não significa apenas ordenar, mas assumir a responsabilidade por tudo aquilo que se encontra sob seu comando.',
        'Ele representa a hierarquia, a ambição de ocupar posições elevadas e a necessidade de provar continuamente que se é digno de permanecer nelas. Para os Demônios, o Soberano é a lembrança de que nenhum trono se mantém apenas pelo nome de quem o ocupa.'
      ],
      poem: [
        'O poder não se mede pela coroa,',
        'Mas pelo peso que repousa sobre ela;',
        'Pois aquele que governa sem propósito',
        'É apenas um servo sentado em seu trono.'
      ],
      poet: 'Careca!',
      belief: 'O Soberano é honrado através de juramentos, demonstrações de liderança e da construção de monumentos que simbolizem autoridade. Reis, generais e governantes costumam erguer estátuas em sua homenagem, enquanto seus salões são decorados com estandartes e registros de conquistas políticas ou militares. Em algumas tradições, líderes renovam seus juramentos diante de seus subordinados, reafirmando publicamente os deveres que aceitaram. Para o Soberano, exigir obediência sem demonstrar competência é uma afronta: toda autoridade precisa ser sustentada por ações.'
    },
    {
      name: '𝓐 𝓒𝓲𝓷𝔃𝓪',
      description: [
        'É a resistência, a memória e a capacidade de recomeçar depois da destruição. A Cinza existe para lembrar aos Demônios que nem toda derrota representa o fim e que, mesmo quando tudo aquilo que se conhecia desaparece, ainda pode restar algo capaz de dar origem a um novo começo.',
        'Ela representa os vestígios das batalhas, os nomes daqueles que partiram e a força necessária para reconstruir aquilo que foi perdido. Para os Demônios, a Cinza ensina que sobreviver não é apenas permanecer de pé, mas encontrar um motivo para continuar.'
      ],
      poem: [
        'Daquilo que o fogo consumiu,',
        'Resta a memória sobre o chão;',
        'E onde antes repousavam ruínas,',
        'Outra vez se erguerá a construção.'
      ],
      poet: 'Careca!',
      belief: 'A Cinza é honrada através da preservação da memória e da reconstrução após períodos de destruição. Seus devotos mantêm ruínas como memoriais, guardam objetos pertencentes aos que morreram e registram os nomes daqueles que não devem ser esquecidos. Em algumas regiões, pequenas urnas com cinzas simbólicas são colocadas em altares ou monumentos dedicados aos sobreviventes. Também é comum dedicar à entidade uma construção recém-erguida após uma guerra ou calamidade. Para a Cinza, não é necessário destruir para demonstrar devoção: reconstruir aquilo que parecia perdido já é, por si só, uma oferenda.'
    }
  ]
}

const aquarianOntology = {
  title: 'Cinco faces da existência aquariana',
  introduction: 'Os 𝓐𝓺𝓾𝓪𝓻𝓲𝓪𝓷𝓸𝓼 possuem uma cultura profundamente ligada ao oceano, às suas profundezas e aos mistérios que habitam suas águas. Para eles, o mar representa tanto a grandiosidade quanto a transformação, guardando belezas capazes de fascinar e forças capazes de consumir tudo aquilo que ousa desafiá-las. Suas cinco entidades são 𝓞 𝓛𝓮𝓿𝓲𝓪𝓽𝗮̃, 𝓐 𝓘𝓪𝓻𝓪, 𝓐 𝓜𝓪𝓻𝓮́, 𝓞 𝓕𝓪𝓻𝓸𝓵𝓮𝓲𝓻𝓸 e 𝓐 𝓟𝓮́𝓻𝓸𝓵𝓪. Cada uma representa uma face da existência aquariana, desde a soberania imensurável das profundezas até a fascinação dos reflexos, a inevitabilidade das mudanças, a orientação em meio à escuridão e a beleza que nasce com o tempo.',
  entities: [
    {
      name: '𝓞 𝓛𝓮𝓿𝓲𝓪𝓽𝗮̃',
      description: [
        'É a imensidão, a soberania e o poder ancestral que repousa nas profundezas. O Leviatã representa o oceano em sua forma mais grandiosa: belo o suficiente para despertar admiração e terrível o suficiente para lembrar aos Aquarianos que nem tudo aquilo que existe pode ser compreendido ou dominado.',
        'Ele simboliza a autoridade das águas, a força que precede os reinos e a grandeza daqueles que carregam o mar em sua própria existência. Para os Aquarianos, o Leviatã é a lembrança de que até os maiores soberanos permanecem pequenos diante da vastidão do oceano.'
      ],
      poem: [
        'Sob mil coroas de espuma,',
        'Onde a luz não ousa entrar,',
        'Dorme aquele que não tem reino,',
        'Pois seu reino é todo o mar.',
        'Não há muralha que o detenha,',
        'Nem corrente que o faça ceder;',
        'Pois antes de os reis terem nomes,',
        'Já havia o que temer.'
      ],
      poet: 'Careca!',
      belief: 'O Leviatã é honrado através de demonstrações de respeito ao oceano e de reconhecimento de sua grandiosidade. Seus devotos constroem monumentos próximos à costa, erguem estátuas colossais e depositam oferendas nas águas profundas, como pérolas, metais preciosos e objetos de grande valor simbólico. Em algumas tradições, navegadores realizam cerimônias antes de atravessar regiões desconhecidas, pedindo permissão para adentrar aquilo que não lhes pertence. Para o Leviatã, a devoção verdadeira não está em tentar controlar o mar, mas em compreender sua pequenez diante dele.'
    },
    {
      name: '𝓐 𝓘𝓪𝓻𝓪',
      description: [
        'É o reflexo, a fascinação e a obsessão que nasce quando alguém passa a desejar aquilo que vê. A Iara existe para representar a fronteira entre a admiração e o aprisionamento, entre reconhecer a própria imagem e tornar-se incapaz de enxergar qualquer coisa além dela.',
        'Seus domínios envolvem a beleza percebida, os desejos que se alimentam da contemplação e as ilusões que alguém escolhe acreditar. Para os Aquarianos, a Iara é a lembrança de que nem todo reflexo revela a verdade e de que, às vezes, aquilo que mais encanta é justamente aquilo que mais profundamente nos prende.'
      ],
      poem: [
        'Na superfície imóvel,',
        'Há um rosto a me chamar;',
        'Quanto mais busco alcançá-lo,',
        'Mais me afundo em seu olhar.',
        'E se a imagem me pertence,',
        'Por que não posso tocá-la?',
        'Talvez eu tema o que sou,',
        'Ou talvez tema encontrá-la.'
      ],
      poet: 'Careca!',
      belief: 'A Iara é honrada através de espelhos, superfícies polidas e oferendas que representem aquilo que seus devotos mais desejam. Seus santuários costumam ser construídos junto a lagos cristalinos, grutas inundadas e piscinas naturais, onde a água permanece imóvel o suficiente para refletir o céu. Alguns devotos deixam joias, perfumes, adornos ou retratos diante de seus altares, enquanto outros realizam rituais de contemplação, buscando compreender os próprios desejos. Entretanto, seus seguidores mais tradicionais acreditam que a Iara não deve ser venerada por aquilo que promete mostrar, mas pelo que obriga cada um a reconhecer em si mesmo.'
    },
    {
      name: '𝓐 𝓜𝓪𝓻𝓮́',
      description: [
        'É a mudança, os ciclos e a força inevitável que transforma tudo aquilo que toca. A Maré representa o movimento constante das águas, lembrando aos Aquarianos que nenhuma condição permanece para sempre e que até os períodos de calmaria escondem a possibilidade de uma transformação.',
        'Ela simboliza as partidas e os retornos, as perdas que abrem espaço para novos caminhos e a capacidade de acompanhar o curso da existência sem permanecer preso ao passado. Para os Aquarianos, a Maré ensina que resistir a toda mudança é como tentar ordenar ao oceano que permaneça imóvel.'
      ],
      poem: [
        'A onda parte, a onda retorna,',
        'Nenhuma encontra o mesmo lugar;',
        'O que hoje repousa na areia,',
        'Amanhã voltará a navegar.',
        'Não amaldiçoes a corrente,',
        'Nem implores ao tempo que pare;',
        'Há caminhos que só se revelam',
        'Quando sobe ou recua a maré.'
      ],
      poet: 'Careca!',
      belief: 'A Maré é honrada através de rituais ligados às mudanças de ciclo, às partidas e aos recomeços. Seus devotos costumam realizar cerimônias durante as mudanças das águas, depositando pequenas conchas, flores e objetos simbólicos que representam aquilo que desejam deixar para trás. Alguns santuários são construídos em regiões que alternam entre terra firme e áreas submersas, permitindo que a própria maré determine quando seus altares ficam acessíveis. Também é comum que viajantes e famílias procurem sua bênção antes de iniciar uma nova etapa de suas vidas. Para a Maré, aceitar a mudança é uma forma de fé, e saber partir pode ser tão importante quanto saber retornar.'
    },
    {
      name: '𝓞 𝓕𝓪𝓻𝓸𝓵𝓮𝓲𝓻𝓸',
      description: [
        'É a orientação, a esperança e a responsabilidade de iluminar caminhos sem poder percorrê-los por aqueles que se perderam. O Faroleiro existe para representar aqueles que permanecem atentos quando outros se encontram à deriva, oferecendo direção sem prometer que toda jornada será segura.',
        'Ele simboliza a perseverança diante da escuridão, a sabedoria de reconhecer os próprios limites e a importância de preservar uma luz mesmo quando ninguém parece estar procurando por ela. Para os Aquarianos, o Faroleiro é a lembrança de que guiar alguém não significa decidir seu destino, mas permitir que encontre o próprio caminho.'
      ],
      poem: [
        'Se a noite cobrir os caminhos,',
        'Se a corrente esconder o chão,',
        'Que permaneça acesa a luz',
        'Na janela da solidão.',
        'Não escolherei teu destino,',
        'Nem poderei teu mar acalmar;',
        'Mas enquanto houver uma chama,',
        'Saberás onde procurar.'
      ],
      poet: 'Careca!',
      belief: 'O Faroleiro é honrado através da proteção aos viajantes, do auxílio aos perdidos e da preservação de lugares que orientam aqueles que atravessam as águas. Seus devotos mantêm lanternas acesas em portos, constroem faróis e oferecem abrigo aos navegadores que retornam de jornadas difíceis. Em comunidades submersas, suas homenagens podem assumir a forma de cristais luminosos instalados em passagens perigosas, guiando viajantes através das profundezas. Também é comum que seus seguidores dediquem parte de seu tempo a ensinar rotas seguras e ajudar aqueles que não conhecem o caminho. Para o Faroleiro, a maior oferenda é uma vida que encontra o caminho de volta graças à luz que alguém decidiu manter acesa.'
    },
    {
      name: '𝓐 𝓟𝓮́𝓻𝓸𝓵𝓪',
      description: [
        'É a paciência, a transformação e o valor que nasce de processos que poucos conseguem testemunhar. A Pérola representa aquilo que se desenvolve lentamente, escondido dos olhos alheios, até adquirir uma beleza própria.',
        'Ela existe para lembrar aos Aquarianos que nem toda dificuldade precisa ser encarada como uma maldição e que certas experiências, mesmo quando dolorosas, podem transformar a maneira como alguém compreende a si mesmo e ao mundo. Para os Aquarianos, a Pérola é a lembrança de que o verdadeiro valor nem sempre está naquilo que nasce perfeito, mas naquilo que se transforma com o tempo.'
      ],
      poem: [
        'No silêncio do fundo,',
        'Longe do brilho e do olhar,',
        'Cresce uma pequena estrela',
        'Que ninguém veio procurar.',
        'Não foi o mar que a fez perfeita,',
        'Nem o tempo que a fez igual;',
        'Foi o que enfrentou escondida',
        'Que a tornou tão singular.'
      ],
      poet: 'Careca!',
      belief: 'A Pérola é honrada através da paciência, da preservação de memórias e da valorização daquilo que amadurece com o tempo. Seus devotos oferecem pérolas encontradas em suas jornadas, mas também criam joias com materiais que possuem histórias familiares, transmitindo-as entre gerações. Seus santuários costumam ser discretos, adornados com conchas, madrepérola e pequenas relíquias preservadas cuidadosamente. Em algumas tradições, uma pérola só pode ser oferecida após anos de dedicação a um ofício, uma promessa ou uma jornada pessoal. Para a Pérola, o valor de uma oferenda não depende de seu brilho, mas da história e da transformação que ela carrega consigo.'
    }
  ]
}

const chimeraOntology = {
  title: 'Cinco faces da existência quimérica',
  introduction: 'Os 𝓠𝓾𝓲𝓶𝓮𝓻𝓪𝓼 possuem uma existência marcada pela diversidade, pela adaptação e pelas diferentes formas de compreender o mundo. Entre os Passeriformes, os Insecta e os Feral, suas culturas expressam maneiras distintas de enxergar a liberdade, a comunidade, os instintos e o valor da própria existência. Suas cinco entidades são 𝓐 𝓢𝓸𝓫𝓮𝓻𝓪𝓷𝓪, 𝓞 𝓔𝓷𝔁𝓪𝓶𝓮, 𝓐 𝓕𝓮𝓻𝓪, 𝓞 𝓔𝓰𝓸 e 𝓐 𝓜𝓾𝓽𝓪𝓬̧𝓪̃𝓸. Cada uma representa uma face da existência quimérica, desde a liberdade de alcançar os céus e a força da coletividade até os instintos selvagens, a devoção absoluta a si mesmo e a capacidade de transformar-se diante de um mundo em constante mudança.',
  entities: [
    {
      name: '𝓐 𝓢𝓸𝓫𝓮𝓻𝓪𝓷𝓪',
      description: [
        'É a liberdade, a elevação e a busca por horizontes que poucos conseguem alcançar. A Soberana representa os Passeriformes, suas asas e o desejo de ultrapassar os limites impostos pelo mundo.',
        'Ela simboliza a ambição de alcançar o céu, a independência daqueles que não aceitam permanecer presos e a visão daqueles que observam o mundo de uma perspectiva distante. Para os Quimeras, a Soberana é a lembrança de que nascer com asas não significa estar livre, pois até mesmo aqueles capazes de alcançar os céus podem viver acorrentados.'
      ],
      poem: [
        'Não há fronteira no horizonte,',
        'Nem corrente capaz de deter;',
        'Aquele que contempla o infinito',
        'Nunca se contenta em permanecer.'
      ],
      poet: 'Careca!',
      belief: 'A Soberana é honrada através da liberdade, da exploração e da busca por novos horizontes. Seus devotos constroem santuários em penhascos, montanhas e lugares elevados, onde estandartes são deixados ao vento como oferendas. Entre os Passeriformes, é comum realizar cerimônias nas quais os jovens partem em jornadas para conhecer terras distantes, retornando apenas quando acreditam ter encontrado algo digno de compartilhar. Para a Soberana, a maior demonstração de devoção é viver sem permitir que o medo ou a submissão determinem o próprio destino.'
    },
    {
      name: '𝓞 𝓔𝓷𝔁𝓪𝓶𝓮',
      description: [
        'É a união, a persistência e a força daqueles que jamais enfrentam o mundo sozinhos. O Enxame representa os Insecta, sua organização coletiva e a capacidade de transformar indivíduos frágeis em uma força capaz de desafiar adversários muito maiores.',
        'Ele simboliza o trabalho compartilhado, a lealdade ao grupo e a continuidade de uma comunidade mesmo diante de perdas. Para os Quimeras, o Enxame ensina que a força de um povo não está apenas na capacidade de seus indivíduos, mas naquilo que são capazes de construir juntos.'
      ],
      poem: [
        'Uma asa pode se cansar,',
        'Um corpo pode sucumbir;',
        'Mas mil passos sobre a terra',
        'Não se esquecem de seguir.',
        'Pois aquilo que um começa,',
        'Muitos podem terminar;',
        'E a força que nasce em conjunto',
        'É difícil de quebrar.'
      ],
      poet: 'Careca!',
      belief: 'O Enxame é honrado através do trabalho coletivo, da proteção comunitária e da preservação das tradições. Seus devotos constroem colmeias cerimoniais, monumentos compostos por milhares de pequenas peças e espaços onde cada membro da comunidade contribui com algo próprio. Oferendas individuais são consideradas incompletas quando não acompanhadas de alguma contribuição ao grupo. Entre os Insecta, é comum que grandes obras sejam dedicadas ao Enxame, com cada participante deixando nelas uma marca de sua participação. Para essa entidade, nenhuma contribuição é insignificante quando fortalece o todo.'
    },
    {
      name: '𝓐 𝓕𝓮𝓻𝓪',
      description: [
        'É o instinto, a sobrevivência e a liberdade daqueles que se recusam a ser domados. A Fera representa os Feral, sua ligação com a natureza e a força que nasce da necessidade de sobreviver.',
        'Ela simboliza os sentidos aguçados, a territorialidade e a capacidade de reconhecer ameaças antes que elas se aproximem. Não representa apenas a brutalidade, mas também a sabedoria instintiva de saber quando avançar, recuar ou proteger aquilo que se ama. Para os Quimeras, a Fera é a lembrança de que a civilização pode ensinar muitas coisas, mas não apaga aquilo que vive dentro de cada criatura.'
      ],
      poem: [
        'Na mata, não há coroa,',
        'Nem promessa, nem senhor;',
        'Há o silêncio entre as folhas',
        'E o chamado do interior.',
        'Não me ensines a ser livre,',
        'Nem me ordenes a temer;',
        'Pois antes de conhecer teu mundo,',
        'Eu já sabia sobreviver.'
      ],
      poet: 'Careca!',
      belief: 'A Fera é honrada através da preservação dos territórios naturais, do respeito aos instintos e da proteção daqueles considerados parte de sua matilha. Seus devotos deixam alimentos, peles e objetos encontrados durante suas jornadas em altares naturais, geralmente escondidos em cavernas, florestas ou regiões selvagens. Entre os Feral, é comum realizar ritos de passagem nos quais os jovens aprendem a reconhecer os sinais da natureza e a sobreviver por conta própria. A caça por prazer e a destruição desnecessária de territórios são vistas como ofensas. Para a Fera, sobreviver não significa apenas permanecer vivo, mas respeitar o mundo que permite a existência.'
    },
    {
      name: '𝓞 𝓔𝓰𝓸',
      description: [
        'É a devoção a si mesmo, a supremacia da própria existência e a convicção de que nada deve estar acima de quem se considera digno de adoração. O Ego ensina que a própria vida é o bem mais precioso de um indivíduo e que qualquer coisa pode ser sacrificada para preservar ou engrandecer aquele que se coloca no centro de sua própria fé.',
        'Seus seguidores não reconhecem a humildade como virtude, mas como uma forma de submissão. Para os Quimeras, o Ego representa o extremo da autossuficiência: a crença de que o mundo inteiro deve servir à própria existência, mesmo quando essa convicção exige que outros paguem o preço.'
      ],
      poem: [
        'Diante do espelho, sou altar,',
        'Diante do mundo, sou lei;',
        'Se tudo nasceu para servir,',
        'Por que serviria a alguém?',
        'Que se curve o que me contempla,',
        'Que se cale o que me desafia;',
        'Pois não existe fé mais alta',
        'Que aquela que em mim principia.'
      ],
      poet: 'Careca!',
      belief: 'O Ego é honrado através da exaltação individual, da busca por poder e de rituais que colocam seus devotos em posição de absoluta submissão à entidade. Seus santuários são adornados com espelhos, estátuas e representações idealizadas de seus seguidores, sempre organizados de modo que a imagem do próprio devoto seja parte central da cerimônia. Em suas tradições mais extremas, seus rituais envolvem sacrifícios de fiéis, considerados a maior prova de que a vontade da entidade está acima da vida de seus próprios adoradores. Alguns seguidores oferecem voluntariamente a própria existência, enquanto outros são escolhidos por sacerdotes que afirmam interpretar os desejos do Ego. Para essa entidade, a devoção máxima consiste em reconhecer que até mesmo a própria vida pode ser considerada inferior àquilo que se adora.'
    },
    {
      name: '𝓐 𝓜𝓾𝓽𝓪𝓬̧𝓪̃𝓸',
      description: [
        'É a adaptação, a transformação e a capacidade de se tornar algo novo diante de um mundo em constante mudança. A Mutação representa aquilo que une todos os Quimeras: a diversidade de formas, características e possibilidades que surgem da própria natureza.',
        'Ela simboliza a mudança como parte da existência e a força daqueles que encontram maneiras de continuar vivendo mesmo quando o ambiente exige que abandonem antigos hábitos. Para os Quimeras, a Mutação é a lembrança de que não existe uma única forma correta de existir e de que aquilo que torna alguém diferente também pode ser aquilo que o mantém vivo.'
      ],
      poem: [
        'Não sou a forma de ontem,',
        'Nem serei a de amanhã;',
        'Sou a mudança que caminha,',
        'A resposta que o mundo não dá.',
        'Se a terra mudar seus caminhos,',
        'Se o céu deixar de brilhar,',
        'Ainda encontrarei outro modo',
        'De permanecer e continuar.'
      ],
      poet: 'Careca!',
      belief: 'A Mutação é honrada através da aceitação das diferenças, da preservação da diversidade e da celebração dos ciclos de transformação. Seus devotos mantêm jardins com espécies variadas, colecionam registros de diferentes linhagens quiméricas e constroem santuários cujas formas são alteradas ao longo dos anos. Em algumas comunidades, mudanças importantes na vida de um indivíduo são marcadas por cerimônias nas quais ele abandona um objeto antigo e recebe outro que represente aquilo que deseja se tornar. Para a Mutação, permanecer igual não é uma obrigação, e transformar-se não significa rejeitar quem se foi, mas permitir que a própria existência continue evoluindo.'
    }
  ]
}

const ontologyIntroduction = {
  introduction: 'As Entidades são seres de existência extremamente poderosa, conhecidos por diferentes nomes e interpretações entre as culturas do mundo. Apesar de muitas religiões tratarem essas criaturas como divindades, não existe uma confirmação absoluta sobre sua verdadeira natureza, origem ou mesmo sobre a veracidade de todas as histórias relacionadas a elas.',
  sections: [
    {
      title: 'Partituras, crença e música',
      paragraphs: [
        'A principal característica das Entidades é sua relação com a crença e com a música. Toda criatura possui uma alma, conhecida neste mundo como Partitura. As Partituras carregam a existência, as experiências e as emoções daqueles que as possuem.',
        'Quando inúmeras criaturas passam a acreditar na mesma ideia, entidade ou conceito, suas crenças podem produzir um Eco. Esse Eco, quando suficientemente forte, pode dar origem a uma nova consciência.'
      ]
    },
    {
      title: 'Ecos e permanência',
      paragraphs: [
        'Os Ecos são associados às músicas e às orações realizadas em nome dessas figuras. Quanto mais uma crença é compartilhada, mais forte pode se tornar sua existência.',
        'Uma entidade depende do Eco produzido pelas Partituras daqueles que acreditam nela. Cultos, canções, orações e histórias podem contribuir para sua permanência.',
        'Caso sua crença desapareça completamente, o Eco também pode desaparecer, fazendo com que a entidade enfraqueça ou até mesmo deixe de existir. Por esse motivo, uma entidade não é necessariamente eterna.'
      ]
    },
    {
      title: 'Origens desconhecidas',
      paragraphs: [
        'Existem atualmente inúmeras histórias sobre as Entidades, mas nenhuma delas é capaz de determinar com certeza como uma entidade realmente nasce.'
      ],
      points: [
        'Algumas religiões afirmam que suas entidades existem desde o início do mundo.',
        'Outras acreditam que elas surgiram apenas depois que seus primeiros seguidores começaram a cantar seus nomes.',
        'Também existem histórias sobre novas entidades surgindo a partir de crenças completamente novas.',
        'Se essas histórias são verdadeiras ou apenas outra forma de explicar o funcionamento da fé permanece desconhecido.'
      ]
    },
    {
      title: 'Tradições de cada raça',
      wide: true,
      paragraphs: [
        'Cada uma das grandes raças possui suas próprias tradições religiosas e um conjunto de cinco entidades amplamente conhecidas. Entretanto, acreditar em uma entidade não significa necessariamente que ela seja real. Algumas são tratadas como figuras históricas, outras como divindades e algumas são consideradas apenas lendas antigas.'
      ],
      points: [
        'Humanos: 𝓐 𝓕𝓸𝓻𝓽𝓾𝓷𝓪, 𝓞 𝓔𝓼𝓬𝓻𝓲𝓫𝓪, 𝓐 𝓟𝓮𝓻𝓮𝓰𝓻𝓲𝓷𝓪, 𝓞 𝓕𝓮𝓻𝓻𝓮𝓲𝓻𝓸 e 𝓐 𝓜𝓪́𝓼𝓬𝓪𝓻𝓪.',
        'Anjos: 𝓐 𝓑𝓪𝓵𝓪𝓷𝓬̧𝓪, 𝓞 𝓒𝓸𝓻𝓸, 𝓐 𝓥𝓲𝓰𝓲́𝓵𝓲𝓪, 𝓞 𝓥𝓮𝓻𝓮𝓭𝓲𝓽𝓸 e 𝓐 𝓐𝓾𝓻𝓸𝓻𝓪.',
        'Daemons: 𝓐 𝓘𝓻𝓪, 𝓞 𝓒𝓸𝓷𝓺𝓾𝓲𝓼𝓽𝓪𝓭𝓸𝓻, 𝓐 𝓛𝓪̂𝓶𝓲𝓷𝓪, 𝓞 𝓢𝓸𝓫𝓮𝓻𝓪𝓷𝓸 e 𝓐 𝓒𝓲𝓷𝔃𝓪.',
        'Aquarianos: 𝓞 𝓛𝓮𝓿𝓲𝓪𝓽𝗮̃, 𝓐 𝓘𝓪𝓻𝓪, 𝓐 𝓜𝓪𝓻𝓮́, 𝓞 𝓕𝓪𝓻𝓸𝓵𝓮𝓲𝓻𝓸 e 𝓐 𝓟𝓮́𝓻𝓸𝓵𝓪.',
        'Quimeras: 𝓐 𝓢𝓸𝓫𝓮𝓻𝓪𝓷𝓪, 𝓞 𝓔𝓷𝔁𝓪𝓶𝓮, 𝓐 𝓕𝓮𝓻𝓪, 𝓞 𝓔𝓰𝓸 e 𝓐 𝓜𝓾𝓽𝓪𝓬̧𝓪̃𝓸.'
      ]
    },
    {
      title: 'Formas e aparências',
      paragraphs: [
        'As entidades não possuem uma forma única ou permanente. Uma mesma entidade pode ser representada de maneiras completamente diferentes por diferentes povos, e sua aparência pode depender da cultura, da época ou da própria interpretação de seus seguidores.',
        'Algumas são descritas como criaturas humanoides, enquanto outras assumem formas animais, monstruosas, abstratas ou até mesmo impossíveis de compreender. Não existe uma aparência considerada universalmente verdadeira.'
      ]
    },
    {
      title: 'Poderes e limites',
      paragraphs: [
        'Embora sejam extremamente poderosas, as Entidades não são onipotentes. Elas possuem limites, podem cometer erros e estão sujeitas às mesmas regras fundamentais que governam a existência. Uma entidade também pode ser destruída ou morrer caso sua existência deixe de ser sustentada.',
        'Seu poder não é necessariamente absoluto dentro de seu próprio domínio. Algumas são capazes de realizar feitos extraordinários, enquanto outras possuem formas muito mais específicas de atuação.',
        'As entidades não possuem autoridade sobre dimensões que não fazem parte da existência conhecida. O mundo, o Céu e o Inferno são os limites conhecidos onde sua influência pode existir.',
        'Uma entidade pode possuir grande influência sobre determinados acontecimentos, pessoas ou conceitos, mas não pode simplesmente ignorar as regras que governam a existência. Mesmo aquelas consideradas extremamente poderosas precisam obedecer às Leis Universais.'
      ]
    },
    {
      title: 'As bênçãos',
      paragraphs: [
        'Alguns indivíduos afirmam ter recebido bênçãos diretamente de uma entidade. Essas bênçãos podem assumir diferentes formas, como manifestações mágicas, proteção, conhecimento ou acontecimentos considerados impossíveis.',
        'Entretanto, nenhuma bênção é capaz de provar sozinha que uma entidade realmente existe. Um indivíduo pode acreditar ter recebido uma bênção enquanto aquilo que aconteceu possui uma explicação completamente diferente. Da mesma forma, uma entidade pode realmente ter interferido sem que ninguém seja capaz de provar que foi ela.'
      ]
    },
    {
      title: 'Orações e vontade própria',
      paragraphs: [
        'As entidades também não possuem a obrigação de responder às orações de seus seguidores. Algumas podem responder imediatamente; outras podem exigir algo em troca; algumas podem simplesmente ignorar aqueles que acreditam nelas. Existem ainda aquelas que aparentemente demonstram interesse apenas em determinados indivíduos ou acontecimentos.',
        'Uma das maiores incertezas relacionadas às Entidades é justamente a existência de sua vontade própria. Não se sabe se elas realmente desejam aquilo que suas religiões afirmam. As histórias podem ter sido modificadas ao longo de milhares de anos.',
        'Um mesmo acontecimento pode ser interpretado como uma bênção por uma cultura e como uma punição por outra. Assim, aquilo que os povos acreditam sobre uma entidade pode ser muito diferente daquilo que ela realmente pensa.'
      ]
    },
    {
      title: 'Uma possibilidade ainda mais estranha',
      wide: true,
      paragraphs: [
        'Uma crença pode criar aquilo em que acredita. Se uma nova ideia for compartilhada por pessoas suficientes, seu Eco pode eventualmente adquirir consciência e transformar-se em uma nova entidade.',
        'Não existe uma forma conhecida de confirmar se isso realmente acontece. Talvez as entidades tenham existido desde o princípio. Talvez tenham nascido das primeiras músicas. Talvez algumas tenham sido criadas pelos próprios povos. E talvez algumas das entidades adoradas atualmente tenham sido apenas histórias antes de começarem a existir.'
      ]
    }
  ],
  closing: 'Entidades não são deus por natureza. São seres que existem entre a fé, a música e a própria existência.'
}

const Forum = () => {
  const [activeSection, setActiveSection] = useState('intro')
  const [selectedRace, setSelectedRace] = useState(null)
  const [selectedOntologyRace, setSelectedOntologyRace] = useState(null)

  const chimeraCommonContent = {
    expectativa: 'de 100 a 120 anos',
    descricao: 'As Quimeras são uma única raça dividida em três classificações: Passeriformes, Insecta e Ferais.',
    introducao: [
      'Todas as Quimeras compartilham uma fome singular: seus corpos conseguem aproveitar uma grande variedade de materiais, incluindo carne, vegetais, folhas, ossos e couro. Para uma Quimera, alimento pode ser muito mais do que aquilo que outras raças considerariam comida.'
    ]
  }

  const chimeraTypes = [
    {
      id: 'passeriformes',
      parentId: 'quimeras',
      name: 'Passeriformes',
      content: {
        ...chimeraCommonContent,
        rosto: '/PasseriformeRosto.png',
        imagem: '/QuimeraPASSERIFORME.png',
        descricao: 'Os Passeriformes são uma das três grandes classificações existentes entre as Quimeras, reconhecidas principalmente pela capacidade de desenvolver asas funcionais. Apesar do nome, não precisam necessariamente possuir características semelhantes às de aves.',
        origemTitulo: 'Adaptação ao voo',
        origem: [
          'Possuem asas funcionais capazes de sustentar seus corpos humanoides.',
          'Suas asas podem apresentar penas, estruturas semelhantes às de insetos ou combinações entre ambas.',
          'Quimeras provenientes da mesma espécie animal podem nascer em classificações diferentes.',
          'Uma Quimera cuja origem costuma ser associada aos insetos pode pertencer aos Passeriformes caso desenvolva asas.'
        ],
        caracteristicas: [
          'Possuem corpos mais delicados e frágeis que os das demais classificações de Quimeras.',
          'Sua estrutura corporal é mais leve, favorecendo a mobilidade e o deslocamento pelos céus.',
          'Têm menor resistência física e não são conhecidas pela força ou pela capacidade de suportar grandes impactos.',
          'Sua principal vantagem está na capacidade de voar e atravessar grandes distâncias.'
        ],
        introducao: [
          'A sociedade Quimera é dividida em castas, e a classificação recebida ao nascer acompanha o indivíduo durante toda a vida. Os Passeriformes ocupam o topo dessa estrutura social. Durante gerações, a capacidade de alcançar os céus foi associada à liberdade, à superioridade e à proximidade com o divino, transformando-se em uma ideologia de superioridade sobre aqueles que permanecem no chão.',
          'A sociedade dos Passeriformes é marcada pelo privilégio. Famílias antigas acumularam riquezas, terras e poder ao longo das gerações, formando uma elite. É comum encontrar Passeriformes em posições de autoridade, controlando propriedades, exércitos e instituições. Nem todos são ricos ou desejam fazer parte dessa elite, mas sua classificação permanece determinada pelo nascimento.',
          'Os Passeriformes possuem grande influência sobre as regras que organizam a sociedade Quimera. Embora não a governem completamente, ocupam posições de destaque e recebem representantes das demais castas para discutir leis.',
          ...chimeraCommonContent.introducao
        ],
        habilidade: {
          nome: 'Impulso Aéreo',
          tipo: 'Habilidade Racial',
          descricao: 'Os Passeriformes conseguem realizar um dash em direção ao ar para ganhar impulso e começar a voar.'
        }
      }
    },
    {
      id: 'insecta',
      parentId: 'quimeras',
      name: 'Insecta',
      content: {
        ...chimeraCommonContent,
        rosto: '/InsectaRosto.png',
        imagem: '/QuimeraINSETO.png',
        descricao: 'As Quimeras Insecta são uma das castas que compõem a sociedade Quimera, reunindo indivíduos com características provenientes de diversos insetos. Apesar da variedade de aparências, todas compartilham corpos extremamente pequenos.',
        origemTitulo: 'Classificação',
        origem: [
          'Apresentam características dos mais diversos insetos.',
          'Nunca ultrapassam um metro de altura, sendo a menor classificação entre as raças.',
          'Indivíduos derivados de insetos que desenvolvem asas funcionais podem ser classificados como Passeriformes; até indivíduos da mesma espécie podem nascer em castas diferentes.'
        ],
        caracteristicas: [
          'Seus corpos podem apresentar adaptações herdadas dos animais que representam, como pernas adicionais.',
          'Seu tamanho permite que se desloquem e trabalhem em espaços pequenos.'
        ],
        magiaTitulo: 'Adaptações naturais',
        magia: [
          'Podem produzir veneno, utilizado para lentamente derrubar suas presas.',
          'Sua capacidade de ocupar espaços pequenos torna essa casta útil em diversas funções da sociedade Quimera.'
        ],
        introducao: [
          'A sociedade Quimera é organizada por um rígido sistema de castas. Nascer Insecta significa ocupar a posição mais baixa dessa estrutura; a classificação representa não apenas uma característica física, mas também uma posição social. As castas superiores frequentemente os enxergam como pequenos e menos importantes, e grande parte de sua população ocupa trabalhos menos valorizados.',
          'Os trabalhos desempenhados pelos Insecta são fundamentais para as comunidades Quimera. Agricultores, trabalhadores, carregadores, artesãos e serventes mantêm plantações, construções e serviços essenciais em funcionamento. Apesar disso, seus salários normalmente são baixos e muitas famílias vivem em condições simples. Para a maioria, por mais que trabalhe, sua casta jamais poderá ser alterada.',
          'Embora frequentemente tratados como a casta menos importante, os Insecta são essenciais para a sociedade Quimera. Sua capacidade de ocupar pequenos espaços permite que desempenhem funções que outras Quimeras teriam dificuldade em realizar.',
          'Os Insecta possuem representantes próprios diante dos líderes da sociedade Quimera. Eles levam reclamações, necessidades e propostas das comunidades aos governantes, mas suas vozes precisam atravessar uma hierarquia construída ao longo de gerações.',
          ...chimeraCommonContent.introducao
        ],
        habilidade: {
          nome: 'Veneno Insecta',
          tipo: 'Habilidade Racial',
          descricao: 'Os Insecta podem produzir veneno para enfraquecer lentamente suas presas.'
        }
      }
    },
    {
      id: 'ferais',
      parentId: 'quimeras',
      name: 'Ferais',
      content: {
        ...chimeraCommonContent,
        rosto: '/FeralRosto.png',
        imagem: '/QuimeraFERAL.png',
        descricao: 'As Quimeras Ferais são o grupo mais diverso entre as Quimeras, reunindo características de múltiplos animais terrestres que não pertencem às categorias Insecta ou Passeriformes. Canídeos, roedores e outros animais podem dar origem a uma Quimera Feral.',
        origem: [
          'Reúnem animais terrestres que não pertencem às categorias Insecta ou Passeriformes.',
          'A variedade é tão grande que é difícil encontrar dois indivíduos completamente iguais.',
          'Mesmo indivíduos semelhantes podem apresentar diferenças significativas na aparência e nas características.'
        ],
        caracteristicas: [
          'Possuem alturas próximas às das demais raças humanoides.',
          'A aparência varia de traços discretos, como orelhas, caudas e presas, a transformações mais marcantes.',
          'Algumas apresentam pelagens, escamas, focinhos e outras características dos animais de origem.',
          'Sua enorme diversidade torna sua aparência uma das mais variadas entre as Quimeras.'
        ],
        magiaTitulo: 'Sentidos e instintos',
        magia: [
          'Possuem olfato extraordinariamente desenvolvido e podem identificar criaturas pelos rastros de cheiro que deixam.',
          'Conseguem distinguir inimigos e localizar suas posições.',
          'Seus instintos e sentidos desenvolvidos tornam-nos extremamente adaptáveis em batalha.'
        ],
        introducao: [
          'As Quimeras Ferais ocupam uma posição intermediária na estrutura de castas. Não pertencem à camada mais baixa da sociedade, como os Insecta, nem fazem parte da elite dos Passeriformes. Representam grande parte da população comum e incluem trabalhadores, comerciantes e pequenos proprietários.',
          'Os Ferais normalmente vivem em condições de renda baixa a média. Não possuem os privilégios das famílias Passeriformes, mas também não carregam o mesmo estigma social dos Insecta. Para muitos, nascer Feral significa nascer como parte do povo, responsável por grande parte da vida cotidiana das cidades Quimera.',
          'Os Ferais possuem representantes na sociedade Quimera, responsáveis por levar as necessidades de sua casta aos governantes e representar uma população diversa em costumes, características e origens.',
          'Como todas as Quimeras, os Ferais conseguem aproveitar uma grande variedade de materiais como fonte de energia, incluindo carne, vegetais, folhas, ossos e couro. Para eles, alimento pode ser muito mais do que aquilo que outras raças considerariam comida.'
        ],
        habilidade: {
          nome: 'Rastreamento Feral',
          tipo: 'Habilidade Racial',
          descricao: 'Com seu olfato extraordinariamente desenvolvido, os Ferais conseguem rastrear criaturas pelos cheiros deixados e distinguir inimigos, identificando suas posições.'
        }
      }
    }
  ]

  const races = [
    {
      id: 'humanos',
      name: 'Humanos',
      icon: <img src="/HumanoRosto.png" alt="" />,
      content: {
        expectativa: 'de 80 a 100 anos',
        descricao: 'Os Humanos são uma das raças mais comuns e versáteis já catalogadas. Não apresentam afinidade natural com qualquer elemento, tampouco possuem características físicas extraordinárias. Ainda assim, são reconhecidos por sua inteligência, capacidade de adaptação e incessante busca por conhecimento.',
        origem: [
          'Habitam o mundo desde tempos imemoriais.',
          'Foram responsáveis pelo desenvolvimento de ferramentas, da escrita e das primeiras grandes sociedades.',
          'Expandiram-se por praticamente todos os continentes e biomas conhecidos.',
          'Sua história é marcada pela constante evolução, adaptação e reconstrução diante das adversidades.'
        ],
        imagem: '/humanoVITRUVIANO.png',
        magia: [
          'Não possuem afinidade elemental, tornando sua natureza completamente neutra.',
          'São a única raça conhecida capaz de aprender e dominar qualquer vertente da magia.',
          'Sua maior arma é a capacidade de aprender com rapidez e adaptar-se a qualquer desafio.'
        ],
        introducao: 'A organização social dos Humanos é baseada na cooperação e na vida em comunidade. São naturalmente inclinados à formação de grupos, vilas e cidades, valorizando relações de confiança, troca de conhecimento e auxílio mútuo. Embora existam inúmeras culturas entre eles, a união é frequentemente apontada como a principal razão para sua permanência e expansão ao longo da história.',
        habilidade: {
          nome: 'Adrenalina',
          tipo: 'Estado Instintivo',
          descricao: 'Quando submetidos a situações extremas, os Humanos podem despertar um estado instintivo conhecido como Adrenalina, elevando temporariamente seus limites físicos.'
        }
      }
    },
    {
      id: 'anjos',
      name: 'Anjos',
      icon: <img src="/AnjoRosto.png" alt="" />,
      content: {
        expectativa: 'de 120 a 150 anos',
        descricao: 'Os Anjos são os nativos do Céu e os principais guardiões das Leis da Criação. Ao contrário do imaginário popular, não são definidos por grandes asas, mas pela Energia Angelical que percorre naturalmente seus corpos desde o nascimento.',
        origem: [
          'Habitam o Céu desde tempos anteriores ao surgimento das civilizações.',
          'São responsáveis por preservar o equilíbrio entre as diferentes sociedades.',
          'Sua sociedade foi fundada sobre os princípios da justiça.',
          'Não governam o mundo, mas garantem que as Leis da Criação sejam respeitadas.'
        ],
        organizacaoSocial: 'A sociedade dos Anjos é altamente organizada e estruturada. O Imperador Celestial representa a maior autoridade do Céu, governando ao lado de conselhos com juízes, estrategistas e oficiais responsáveis por interpretar e aplicar as Leis. Ordens especializadas observam as demais civilizações, investigam violações e intervêm apenas quando o equilíbrio se encontra ameaçado.',
        imagem: '/AnjoVITRUVIANO.png',
        magiaTitulo: 'Magia',
        magia: [
          'Possuem grande afinidade com magias sagradas.',
          'São capazes de acelerar a recuperação de ferimentos e aliviar graves danos físicos.',
          'Muitos dos maiores curandeiros conhecidos pertencem à raça angelical.',
          'Sua energia também lhes permite desafiar parcialmente a gravidade, tornando seus movimentos mais leves.'
        ],
        introducao: 'A responsabilidade dos Anjos é proteger as Quatorze Leis da Criação, princípios absolutos que sustentam a ordem. Essas leis proíbem diversas ações; segundo os registros angelicais, sua violação ameaça a própria continuidade do universo. Desde a juventude, cada Anjo recebe educação em filosofia, ética, história e legislação universal. Espera-se que todo indivíduo encontre uma função útil para a sociedade, tornando-se curandeiro, escriba, pesquisador, construtor, juiz ou mensageiro. Aqueles que ainda não descobriram seu propósito ingressam nas Ordens Guerreiras, onde recebem treinamento militar para proteger as Leis da Criação quando a diplomacia deixa de ser suficiente. Embora frequentemente descritos como seres de pura bondade, os Anjos não se consideram juízes da moral. Sua função não é recompensar os virtuosos nem punir os perversos, mas assegurar que as leis que sustentam a existência permaneçam válidas para todos. Entre eles, a justiça somente existe quando nenhuma criatura está acima das regras.',
        habilidade: {
          nome: 'Cura Angelical',
          tipo: 'Manipulação de Energia Angelical',
          descricao: 'Os Anjos manipulam a Energia Angelical dentro do próprio corpo para curar uma ou várias pessoas ao mesmo tempo. Quanto mais energia utilizam, maior o desgaste: o uso excessivo pode deixá-los fracos.'
        }
      }
    },
    {
      id: 'demonios',
      name: 'Daemons',
      icon: <img src="/DaemonRosto.png" alt="" />,
      content: {
        expectativa: 'de 150 a 180 anos',
        descricao: 'Os Daemons são os habitantes nativos do Inferno, uma raça moldada pelas chamas eternas e pela constante disputa por poder. Entre eles, força, honra e autoridade caminham lado a lado, tornando sua sociedade uma das mais rígidas e implacáveis já registradas.',
        origem: [
          'Habitam o reino infernal desde sua criação.',
          'Desenvolveram-se em um ambiente de calor extremo, fortalezas colossais e guerras constantes.',
          'Sua cultura foi construída sobre a conquista, a sobrevivência e o respeito à hierarquia.',
          'A força é considerada o maior símbolo de legitimidade entre sua espécie.'
        ],
        imagem: '/DemonioVitruviano.png',
        magia: [
          'Sua afinidade natural com o fogo elimina qualquer fraqueza relacionada a esse elemento.',
          'Emoções intensas podem despertar a Ira Demoníaca, ampliando drasticamente sua força e velocidade.',
          'Quanto maior a intensidade desse estado, mais difícil se torna preservar a razão.',
          'A maioria dos guerreiros considera dominar a própria ira um dos maiores desafios de sua existência.'
        ],
        introducao: [
          'A sociedade dos Daemons é regida pela força. Títulos, territórios e riquezas pertencem àqueles capazes de conquistá-los ou herdá-los. A maior parte da população sustenta as cidades infernais através do trabalho, enquanto famílias nobres e Soberanos disputam influência sobre o reino. Acima de toda a hierarquia existe apenas uma autoridade absoluta: a Rainha do Inferno, cuja soberania jamais foi contestada desde a criação do reino.',
          'O Inferno também abriga o domínio do julgamento das almas das demais raças. Após a morte, os mortais são conduzidos ao Julgamento Final, podendo receber três destinos: um inferno pessoal, um paraíso ou o completo desaparecimento no Vazio. Os Daemons, entretanto, não são julgados. Quando morrem, suas almas são consumidas imediatamente pelo Vazio, encerrando sua existência de forma definitiva. Por essa razão, a morte é considerada o único destino verdadeiramente temido por sua espécie.',
          'Embora frequentemente vistos como caóticos pelos povos da superfície, os Daemons seguem um rigoroso código de honra, dever e hierarquia. Cada guerreiro sabe sua posição, cada nobre comanda por seu território e cada desafio de autoridade deve ser resolvido pela força. Para os habitantes do Inferno, governar é conquista reservada apenas àqueles capazes de suportar as chamas mais intensas.'
        ],
        habilidade: {
          nome: 'Ira Demoníaca',
          tipo: 'Habilidade Racial',
          descricao: 'Os Daemons podem despertar sua Ira, tornando-se mais fortes e rápidos e ficando prontos para a batalha. São imunes ao fogo e o calor extremo da lava pode regenerar seus ferimentos. Água e chuva reduzem sua temperatura corporal, deixando-os fracos e incapazes de ativar a Ira.'
        }
      }
    },
    { id: 'quimeras', name: 'Quimeras', icon: <img src="/FeralRosto.png" alt="" /> },
    {
      id: 'aquarianos',
      name: 'Aquarianos',
      icon: <img src="/AquarianoRosto.png" alt="" />,
      content: {
        expectativa: 'de 100 a 120 anos',
        descricao: 'Os Aquarianos são uma raça própria, distinta das Quimeras apesar das semelhanças. Seus corpos possuem características humanoides combinadas com traços de criaturas aquáticas, como peixes e animais que habitam mares e profundezas.',
        origemTitulo: 'Natureza',
        origem: [
          'Sua natureza está diretamente ligada ao ambiente aquático.',
          'Apresentam características provenientes de diferentes criaturas aquáticas.'
        ],
        caracteristicas: [
          'Seus corpos são perfeitamente adaptados à vida subaquática.',
          'Conseguem enxergar em ambientes aquáticos.',
          'Respiram normalmente debaixo d’água, sem depender de equipamentos ou outras formas de adaptação.'
        ],
        imagem: '/AquarianoVITRUVIANO.png',
        introducao: [
          'Embora sejam adaptados à água, os Aquarianos possuem dificuldades significativas longe de seu ambiente natural. O fogo é especialmente perigoso para seus corpos, podendo causar ferimentos mais graves do que causaria em outras raças. Ambientes extremamente secos podem ser debilitantes e fazê-los perder força quando permanecem por longos períodos longe de fontes de água.',
          'A água não representa apenas uma necessidade para os Aquarianos: também moldou sua civilização. Suas cidades foram construídas ao redor dela, sobre ela e, em muitos casos, dentro dela, dando origem a uma sociedade cuja arquitetura e cotidiano foram profundamente influenciados pelo ambiente.',
          'As cidades Aquarianas possuem construções elegantes, grandes praças, palácios ornamentados, jardins e estruturas adaptadas às necessidades de uma civilização que vive sobre e dentro da água.',
          'A religião ocupa uma posição central na cultura Aquariana. A maioria do povo acredita em Leviata, entidade central em sua história. Segundo suas tradições, foi Leviata quem tornou os Aquarianos verdadeiramente livres, conduzindo-os a uma existência de felicidade e união e permitindo que encontrassem seu lugar entre as águas.',
          'O monarca atual é Pierre, um homem já velho que ocupa o trono não apenas como governante, mas também como profeta de Leviata. Sua autoridade está fortemente ligada à sua relação com a entidade e à interpretação de seus ensinamentos, tornando-o uma das figuras centrais da sociedade Aquariana em Chrona e conhecido além do continente.',
          'Apesar da forte presença de Leviata, a sociedade Aquariana não exige que todos sigam essa crença. Outras divindades podem ser cultuadas em suas cidades, desde que respeitem as leis gerais.'
        ],
        habilidade: {
          nome: 'Adaptação Subaquática',
          tipo: 'Habilidade Racial',
          descricao: 'Debaixo d’água, os Aquarianos se movimentam com liberdade igual ou superior à de outras raças em terra firme, mantendo força e precisão. São capazes de lutar e realizar movimentos precisos sem as limitações enfrentadas por criaturas terrestres submersas.'
        }
      }
    }
  ]

  const selectedOntologyContent = selectedOntologyRace?.id === 'humanos'
    ? humanOntology
    : selectedOntologyRace?.id === 'anjos'
      ? angelOntology
      : selectedOntologyRace?.id === 'demonios'
        ? daemonOntology
        : selectedOntologyRace?.id === 'aquarianos'
          ? aquarianOntology
          : selectedOntologyRace?.id === 'quimeras'
            ? chimeraOntology
            : null

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
              onClick={() => {
                setActiveSection('historia')
                setSelectedRace(null)
              }}
            >
              📖 História do Mundo
            </button>
            <button
              className={`forum-nav-btn ${activeSection === 'racas' ? 'active' : ''}`}
              onClick={() => setActiveSection('racas')}
            >
              👥 Raças Disponíveis
            </button>
            <button
              className={`forum-nav-btn ${activeSection === 'ontologia' ? 'active' : ''}`}
              onClick={() => setActiveSection('ontologia')}
            >
              ✨ Ontologia
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
                      <p>No presente, o mundo se encontra em um raro momento de equilíbrio. Após gerações de conflitos entre povos, fronteiras foram redesenhadas e alianças diplomáticas mantêm a paz entre os grandes reinos. Esse período de estabilidade permitiu o florescimento das cidades, do comércio e da cultura. Caravanas atravessam rotas antes perigosas, navios cruzam os mares com mais frequência, e histórias de oportunidades atraem aventureiros, nobres caídos, estudiosos e sonhadores de todos os cantos.</p>
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
                        className={`race-card ${selectedRace?.id === race.id || selectedRace?.parentId === race.id ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedRace(race)
                        }}
                      >
                        <div className="race-icon">{race.icon}</div>
                        <span>{race.name}</span>
                      </div>
                    ))}
                  </div>

                  {selectedRace?.id === 'quimeras' || selectedRace?.parentId === 'quimeras' ? (
                    <div className="chimera-types">
                      <h3>Escolha uma categoria de Quimera</h3>
                      <div className="chimera-types-grid">
                        {chimeraTypes.map(type => (
                          <button
                            type="button"
                            key={type.id}
                            className={`chimera-type-card ${selectedRace.id === type.id ? 'active' : ''}`}
                            onClick={() => setSelectedRace(type)}
                          >
                            <img src={type.content.rosto} alt={`Rosto de ${type.name}`} />
                            <span>{type.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <AnimatePresence mode="wait">
                    {selectedRace && selectedRace.id !== 'quimeras' ? (
                      <motion.div
                        key={selectedRace.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="race-details-card"
                      >
                        <div className="race-details-header">
                          <h2>{selectedRace.name}</h2>
                          {selectedRace.content?.expectativa && (
                            <div className="race-stat-badge">
                              <Heart size={16} /> {selectedRace.content.expectativa}
                            </div>
                          )}
                        </div>

                        {selectedRace.content && (
                          <>
                            {selectedRace.content.descricao && (
                              <div className="lore-block">
                                <div className="lore-subtitle"><BookOpen size={20} /> A Essência</div>
                                <p>{selectedRace.content.descricao}</p>
                              </div>
                            )}

                            {(selectedRace.content.origem || selectedRace.content.culturaFora || selectedRace.content.organizacaoSocial || selectedRace.content.percepcaoDentro) && (
                              <div className="lore-two-columns">
                                {selectedRace.content.origem && (
                                <div className="lore-block">
                                  <div className="lore-subtitle"><Map size={20} /> {selectedRace.content.origemTitulo || 'Origem'}</div>
                                  <ul className="lore-list">
                                    {selectedRace.content.origem.map(item => <li key={item}>{item}</li>)}
                                  </ul>
                                </div>
                                )}
                                {!selectedRace.content.origem && selectedRace.content.culturaFora && (
                                  <div className="lore-block">
                                    <div className="lore-subtitle"><Map size={20} /> Cultura (Fora)</div>
                                    <p>{selectedRace.content.culturaFora}</p>
                                  </div>
                                )}
                                {selectedRace.content.organizacaoSocial && (
                                  <div className="lore-block">
                                    <div className="lore-subtitle"><ShieldCheck size={20} /> Organização Social</div>
                                    <p>{selectedRace.content.organizacaoSocial}</p>
                                  </div>
                                )}
                                {!selectedRace.content.organizacaoSocial && selectedRace.content.percepcaoDentro && (
                                  <div className="lore-block">
                                    <div className="lore-subtitle"><ShieldCheck size={20} /> Percepção (Dentro)</div>
                                    <p>{selectedRace.content.percepcaoDentro}</p>
                                  </div>
                                )}
                              </div>
                            )}

                            {(selectedRace.content.caracteristicas || selectedRace.content.magia) && (
                              <div className="lore-two-columns">
                                {selectedRace.content.caracteristicas && (
                                  <div className="lore-block">
                                    <div className="lore-subtitle"><User size={20} /> Características</div>
                                    <ul className="lore-list">
                                      {selectedRace.content.caracteristicas.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                  </div>
                                )}
                                {selectedRace.content.magia && (
                                  <div className="lore-block">
                                    <div className="lore-subtitle"><Zap size={20} /> {selectedRace.content.magiaTitulo || 'Magia'}</div>
                                    {Array.isArray(selectedRace.content.magia) ? (
                                      <ul className="lore-list">
                                        {selectedRace.content.magia.map(item => <li key={item}>{item}</li>)}
                                      </ul>
                                    ) : (
                                      <p>{selectedRace.content.magia}</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                              </>
                            )}

                            {selectedRace.content?.imagem && (
                              <div className="race-details-illustration">
                              <img
                                src={selectedRace.content.imagem}
                                alt={`Ilustração das características físicas dos ${selectedRace.name}`}
                              />
                              </div>
                            )}

                            {selectedRace.content?.introducao && (
                              <div className="lore-block race-introduction">
                                <div className="lore-subtitle"><BookOpen size={20} /> Introdução</div>
                                {Array.isArray(selectedRace.content.introducao) ? (
                                  selectedRace.content.introducao.map(paragrafo => <p key={paragrafo}>{paragrafo}</p>)
                                ) : (
                                  <p>{selectedRace.content.introducao}</p>
                                )}
                              </div>
                            )}

                        {selectedRace.content?.habilidade && (
                          <div className="ability-card">
                            <div className="ability-title">
                              <Zap size={24} /> {selectedRace.content.habilidade.nome}
                              <span className="ability-type">{selectedRace.content.habilidade.tipo}</span>
                            </div>
                            <p className="ability-description">{selectedRace.content.habilidade.descricao}</p>
                            {(selectedRace.content.habilidade.efeito || selectedRace.content.habilidade.recarga) && (
                              <div className="ability-footer">
                                {selectedRace.content.habilidade.efeito && <div className="ability-effect"><strong>Efeito:</strong> {selectedRace.content.habilidade.efeito}</div>}
                                {selectedRace.content.habilidade.recarga && <div className="ability-cooldown"><strong>Recarga:</strong> {selectedRace.content.habilidade.recarga}</div>}
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <div className="race-placeholder">
                        {selectedRace?.id === 'quimeras'
                          ? 'Escolha uma categoria de Quimera para ver sua imagem'
                          : 'Selecione uma raça para ver seus detalhes'}
                      </div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {activeSection === 'ontologia' && (
                <motion.div
                  key="ontologia"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="ontology-section"
                >
                  <h2>Ontologia</h2>
                  <p className="ontology-intro">Conheça como as entidades se relacionam com a fé, a música e as diferentes culturas.</p>
                  <div className="ontology-races">
                    <button
                      type="button"
                      className={`ontology-race-btn ontology-intro-tab ${selectedOntologyRace === null ? 'active' : ''}`}
                      onClick={() => setSelectedOntologyRace(null)}
                    >
                      <span className="ontology-race-icon"><BookOpen size={32} /></span>
                      <span>Introdução</span>
                    </button>
                    {races.map(race => (
                      <button
                        type="button"
                        key={race.id}
                        className={`ontology-race-btn ${selectedOntologyRace?.id === race.id ? 'active' : ''}`}
                        onClick={() => setSelectedOntologyRace(race)}
                      >
                        <span className="ontology-race-icon">{race.icon}</span>
                        <span>{race.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className={`ontology-entities ${selectedOntologyContent ? 'ontology-entities--human' : selectedOntologyRace ? '' : 'ontology-entities--intro'}`}>
                    {selectedOntologyContent ? (
                      <div className="ontology-human-content ontology-human-content--selected">
                          <header className="ontology-human-heading">
                            <span className="ontology-human-kicker">Entidades de {selectedOntologyRace.name}</span>
                            <h3>{selectedOntologyContent.title}</h3>
                          </header>
                          <p className="ontology-human-intro">{selectedOntologyContent.introduction}</p>
                          <div className="ontology-entity-list">
                            {selectedOntologyContent.entities.map((entity, index) => (
                              <article className="ontology-entity-card" key={entity.name}>
                                <div className="ontology-entity-heading">
                                  <span className="ontology-entity-number">{String(index + 1).padStart(2, '0')}</span>
                                  <h4>{entity.name}</h4>
                                </div>
                                {entity.description.map(paragraph => (
                                  <p key={paragraph}>{paragraph}</p>
                                ))}
                                {entity.poem && (
                                  <blockquote className="ontology-entity-poem">
                                    <p>{entity.poem.join('\n')}</p>
                                    <cite>— {entity.poet}</cite>
                                  </blockquote>
                                )}
                                <div className="ontology-entity-belief">
                                  <h5>A Maneira da Crença</h5>
                                  <p>{entity.belief}</p>
                                </div>
                              </article>
                            ))}
                          </div>
                      </div>
                    ) : selectedOntologyRace ? (
                      <div className="ontology-world-intro">
                        <h3>{selectedOntologyRace.name}</h3>
                        <p>As entidades desta raça serão adicionadas aqui.</p>
                      </div>
                    ) : (
                      <div className="ontology-world-intro">
                        <header className="ontology-human-heading">
                          <span className="ontology-human-kicker">Fé • Música • Existência</span>
                          <h3>Como funcionam as Entidades?</h3>
                        </header>
                        <p className="ontology-world-lead">{ontologyIntroduction.introduction}</p>
                        <div className="ontology-intro-grid">
                          {ontologyIntroduction.sections.map((section, index) => (
                            <article
                              className={`ontology-intro-card ${section.wide ? 'ontology-intro-card--wide' : ''}`}
                              key={section.title}
                            >
                              <div className="ontology-intro-card-heading">
                                <span className="ontology-entity-number">{String(index + 1).padStart(2, '0')}</span>
                                <h4>{section.title}</h4>
                              </div>
                              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                              {section.points && (
                                <ul>
                                  {section.points.map(point => <li key={point}>{point}</li>)}
                                </ul>
                              )}
                            </article>
                          ))}
                        </div>
                        <p className="ontology-world-closing">{ontologyIntroduction.closing}</p>
                      </div>
                    )}
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

const Profile = ({ user }) => {
  const [lores, setLores] = useState([])
  const [selectedLore, setSelectedLore] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentVipStatus, setCurrentVipStatus] = useState({ vip_tag: user?.vip_tag || 'Nenhum', beta: user?.beta || false })

  const refreshVipStatus = useCallback(async () => {
    if (user?.id) {
      const { data: vipData, error: vipError } = await supabase
        .from('vips')
        .select('vip_tag, beta')
        .eq('discord_id', user.id)
        .single()

      if (!vipError && vipData) {
        setCurrentVipStatus({
          vip_tag: vipData.vip_tag || 'Nenhum',
          beta: vipData.beta === true
        })
      }
    }
  }, [user?.id])

  useEffect(() => {
    const fetchUserLoresAndVipStatus = async () => {
      await refreshVipStatus()

      // Fetch user lores
      const filtros = []

      if (user?.id) filtros.push(`discord_id.eq.${user.id}`)
      if (user?.username) {
        filtros.push(`discord_tag.eq.${user.username}`)
        filtros.push(`discord_tag.eq.${user.username}#0`)
      }

      const { data, error } = await supabase
        .from('lores')
        .select('*')
        .or(filtros.join(','))
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar lores do usuário:', error)
        return
      }

      setLores(data || [])
    }

    if (user) {
      fetchUserLoresAndVipStatus()
    }
  }, [user, refreshVipStatus])

  // Refresh VIP status every 10 seconds to catch admin updates
  useEffect(() => {
    if (!user?.id) return

    const interval = setInterval(() => {
      refreshVipStatus()
    }, 10000)

    return () => clearInterval(interval)
  }, [user?.id, refreshVipStatus])

  if (!user) return <div className="main-content"><h1>Por favor, faça login.</h1></div>

  const profileVipTag = currentVipStatus.vip_tag || 'Nenhum'
  const profileBetaActive = currentVipStatus.beta === true
  const approvedCount = lores.filter(lore => lore.status === 'APROVADA').length
  const interviewCount = lores.filter(lore => lore.status === 'EM_ENTREVISTA').length
  const pendingCount = lores.filter(lore => lore.status === 'PENDENTE').length

  return (
    <PageTransition>
      <div className="main-content">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-user-info">
              <div className="profile-avatar-wrapper">
                <img
                  src={user.avatar_url}
                  alt=""
                  className="profile-avatar"
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=d565e5&color=fff` }}
                />
                <span className="profile-avatar-glow"></span>
              </div>

              <div className="profile-user-content">
                <div className="profile-user-main">
                  <div className="profile-identity-block">
                    <span className="profile-section-kicker">Perfil da Conta</span>
                    <h1 className="profile-username">{user.username}</h1>
                    <p className="profile-discord-tag">@{user.username}</p>
                  </div>

                  <div className="profile-vip-panel">
                    <span className="profile-vip-label">Tier VIP</span>
                    <div className="profile-vip-badges">
                      <span className={getVipClassName(profileVipTag)}>{getVipDisplayValue(profileVipTag)}</span>
                      {profileBetaActive && <span className={getBetaClassName()}>Beta</span>}
                    </div>
                  </div>
                </div>

                <div className="profile-meta-grid">
                  <div className="profile-meta-card">
                    <span className="profile-meta-label">ID da conta</span>
                    <strong className="profile-meta-value profile-meta-value--mono">{user.id}</strong>
                  </div>

                  <div className="profile-meta-card">
                    <span className="profile-meta-label">Whitelists enviadas</span>
                    <strong className="profile-meta-value">{lores.length}</strong>
                  </div>

                  <div className="profile-meta-card">
                    <span className="profile-meta-label">Aprovadas</span>
                    <strong className="profile-meta-value">{approvedCount}</strong>
                  </div>

                  <div className="profile-meta-card">
                    <span className="profile-meta-label">Pendentes</span>
                    <strong className="profile-meta-value">{pendingCount}</strong>
                  </div>

                  <div className="profile-meta-card">
                    <span className="profile-meta-label">Em entrevista</span>
                    <strong className="profile-meta-value">{interviewCount}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-lores-section">
            <div className="profile-lores-heading">
              <div>
                <span className="profile-lores-kicker">Sua jornada em Musae Eras</span>
                <h2 className="lore-title lore-title-small">Minhas Partituras</h2>
              </div>
              <span className="profile-lores-count">{lores.length} {lores.length === 1 ? 'ficha' : 'fichas'}</span>
            </div>
            {lores.length === 0 ? (
              <div className="profile-empty-state">
                <div className="profile-empty-icon"><BookOpen size={26} /></div>
                <h3>Sua história começa com uma partitura</h3>
                <p>Você ainda não enviou nenhuma ficha. Crie seu personagem para começar sua jornada em Musae Eras.</p>
                <Link to="/compor" className="profile-create-link">Criar minha ficha <PenTool size={16} /></Link>
              </div>
            ) : (
              <div className="profile-lores-grid">
                {lores.map(f => (
                  <div
                    key={f.id}
                    className="profile-lore-card profile-lore-card--enhanced"
                    onClick={() => { setSelectedLore(f); setModalOpen(true) }}
                  >
                    <div className="profile-lore-card-top">
                      <div
                        className="status-badge profile-status-inline"
                        style={{
                          backgroundColor: f.status === 'APROVADA' ? 'rgba(35, 165, 89, 0.16)' : f.status === 'RECUSADA' ? 'rgba(242, 63, 71, 0.16)' : 'rgba(240, 178, 50, 0.16)',
                          color: f.status === 'APROVADA' ? '#57d98c' : f.status === 'RECUSADA' ? '#ff6b72' : '#f4c55d'
                        }}
                      >
                        {STATUS_LABELS[f.status] || f.status}
                      </div>
                    </div>

                    {f.status === 'EM_ENTREVISTA' && (
                      <div className="interview-notice">{INTERVIEW_NOTICE}</div>
                    )}

                    <div className="profile-lore-card-headline">
                      <h3>{f.nome}</h3>
                      <p>@{f.nick}</p>
                    </div>

                    <div className="profile-lore-meta-grid profile-lore-meta-grid--compact">
                      <div className="profile-lore-meta-item">
                        <span className="profile-lore-meta-label">Raça</span>
                        <strong className="profile-lore-meta-value">{f.raca}</strong>
                      </div>
                      <div className="profile-lore-meta-item">
                        <span className="profile-lore-meta-label">Idade</span>
                        <strong className="profile-lore-meta-value">{f.idade}</strong>
                      </div>
                    </div>

                    {f.discord_id && (
                      <div className="profile-lore-account-chip">
                        <span className="profile-lore-meta-label">ID da conta</span>
                        <strong className="profile-lore-meta-value profile-lore-meta-value--mono">{f.discord_id}</strong>
                      </div>
                    )}

                    <div className="profile-lore-story-box">
                      <span className="profile-lore-story-label">Prévia da história</span>
                      <p className="profile-lore-preview">
                        {f.historia?.length > 150 ? `${f.historia.substring(0, 150)}...` : f.historia}
                      </p>
                    </div>

                    <div className="profile-lore-card-footer">
                      <span>Abrir detalhes da ficha</span>
                    </div>
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
                className="modal-content profile-lore-modal"
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <button className="modal-close" onClick={() => setModalOpen(false)}><X size={24} /></button>

                <div className="profile-lore-modal-header">
                  <div className="profile-lore-modal-top">
                    <div
                      className="status-badge profile-status-inline"
                      style={{
                        backgroundColor: selectedLore.status === 'APROVADA' ? 'rgba(35, 165, 89, 0.16)' : selectedLore.status === 'RECUSADA' ? 'rgba(242, 63, 71, 0.16)' : 'rgba(240, 178, 50, 0.16)',
                        color: selectedLore.status === 'APROVADA' ? '#57d98c' : selectedLore.status === 'RECUSADA' ? '#ff6b72' : '#f4c55d'
                      }}
                    >
                      {STATUS_LABELS[selectedLore.status] || selectedLore.status}
                    </div>
                  </div>

                  <div className="profile-lore-modal-titleblock">
                    <span className="profile-lore-modal-kicker">Ficha enviada</span>
                    <h2>{selectedLore.nome}</h2>
                    <p>@{selectedLore.nick}</p>
                  </div>
                </div>

                {selectedLore.status === 'EM_ENTREVISTA' && (
                  <div className="interview-notice">{INTERVIEW_NOTICE}</div>
                )}

                <div className="profile-lore-modal-grid">
                  <div className="profile-lore-modal-item">
                    <span className="profile-lore-modal-label">Raça</span>
                    <strong>{selectedLore.raca}</strong>
                  </div>
                  <div className="profile-lore-modal-item">
                    <span className="profile-lore-modal-label">Idade</span>
                    <strong>{selectedLore.idade}</strong>
                  </div>
                  <div className="profile-lore-modal-item profile-lore-modal-item--full">
                    <span className="profile-lore-modal-label">ID da conta</span>
                    <strong className="profile-lore-meta-value--mono">{selectedLore.discord_id || 'Não informado'}</strong>
                  </div>
                </div>

                <div className="profile-lore-story-panel">
                  <h3>História do personagem</h3>
                  <p>{selectedLore.historia}</p>
                </div>

                {selectedLore.status === 'RECUSADA' && selectedLore.motivo && (
                  <div className="profile-motivo-box profile-motivo-box--enhanced">
                    <span className="profile-motivo-kicker">Análise da administração</span>
                    <strong>Motivo da recusa</strong>
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
    if (!user) {
      alert('Faça login primeiro!')
      return
    }

    setLoading(true)

    // Buscar a vip_tag mais recente do usuário diretamente do banco de dados
    const { data: userProfile, error: profileError } = await supabase
      .from('vips')
      .select('vip_tag')
      .eq('discord_id', user.id)
      .single()

    let currentVipTag = 'Nenhum'
    if (userProfile && !profileError) {
      currentVipTag = userProfile.vip_tag || 'Nenhum'
    }

    const { error } = await supabase.from('lores').insert([{
      ...formData,
      discord_tag: user.username,
      discord_id: user.id,
      status: 'PENDENTE',
      vip_tag: currentVipTag
    }])

    setLoading(false)

    if (error) {
      alert('Erro ao enviar: ' + error.message)
    } else {
      alert('Ficha enviada com sucesso!')
      navigate('/perfil')
    }
  }

  return (
    <PageTransition>
      <div className="main-content">
        <div className="form-container form-container--lore">
          <div className="form-hero">
            <span className="form-kicker">Whitelist do personagem</span>
            <h1>Componha sua Obra</h1>
            <p className="form-intro">
              Preencha sua ficha com atenção. Quanto mais clara e bem estruturada estiver sua história, melhor será a análise da sua whitelist.
            </p>
          </div>

          <div className="form-highlight-grid">
            <div className="form-highlight-card">
              <span className="form-highlight-title">Identidade</span>
              <p>Defina nome, nick e idade do personagem com clareza.</p>
            </div>
            <div className="form-highlight-card">
              <span className="form-highlight-title">Raça</span>
              <p>Escolha a origem correta para manter coerência com o universo.</p>
            </div>
            <div className="form-highlight-card">
              <span className="form-highlight-title">História</span>
              <p>Descreva passado, motivação e personalidade em no mínimo 15 linhas.</p>
            </div>
          </div>

          {user?.id && (
            <div className="form-account-banner">
              <span className="form-account-label">Conta vinculada</span>
              <strong className="form-account-value">{user.id}</strong>
            </div>
          )}

          <form onSubmit={handleSubmit} className="ficha-form ficha-form--enhanced">
            <div className="form-section-card">
              <div className="form-section-header">
                <h2>Dados principais</h2>
                <p>Essas informações identificam sua ficha dentro da whitelist.</p>
              </div>

              <div className="form-grid form-grid--two">
                <div className="form-group">
                  <label>Nome do Personagem</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Aelion Thorne"
                    value={formData.nome}
                    onChange={e => setFormData({ ...formData, nome: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Nick no Minecraft</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: AelionMC"
                    value={formData.nick}
                    onChange={e => setFormData({ ...formData, nick: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Raça</label>
                  <select value={formData.raca} onChange={e => setFormData({ ...formData, raca: e.target.value })}>
                    <option>Humanos</option>
                    <option>Anjos</option>
                    <option>Demônios</option>
                    <option>Quimeras</option>
                    <option>Aquarianos</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Idade</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="Ex: 24"
                    value={formData.idade}
                    onChange={e => setFormData({ ...formData, idade: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="form-section-card">
              <div className="form-section-header">
                <h2>História do personagem</h2>
                <p>Capriche no contexto. Explique origem, objetivos, traços marcantes e o que torna seu personagem interessante.</p>
              </div>

              <div className="form-group form-group--story">
                <label>História completa</label>
                <textarea
                  required
                  rows="12"
                  placeholder="Conte a trajetória do seu personagem, sua personalidade, conflitos, motivações e como ele chegou até este mundo."
                  value={formData.historia}
                  onChange={e => setFormData({ ...formData, historia: e.target.value })}
                />
                <div className="form-helper-row">
                  <span className="form-helper-text">Mínimo recomendado: 15 linhas bem desenvolvidas.</span>
                  <span className="form-helper-text">Caracteres: {formData.historia.length}</span>
                </div>
              </div>
            </div>

            <div className="form-submit-row">
              <p className="form-submit-note">
                Revise sua ficha antes de enviar. Após o envio, ela irá para análise da administração.
              </p>
              <button type="submit" disabled={loading} className="submit-btn submit-btn--lore">
                {loading ? 'Enviando...' : 'Enviar Sinfonia'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  )
}

const LoginPage = () => {
  useEffect(() => {
    const fetchDiscordUser = async (token) => {
      const res = await fetch('https://discord.com/api/users/@me', { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      const avatarUrl = data.avatar
        ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=256`
        : `https://cdn.discordapp.com/embed/avatars/${data.discriminator % 5}.png`

      const { data: userProfile, error: profileError } = await supabase
        .from('vips')
        .select('vip_tag, beta')
        .eq('discord_id', data.id)
        .single()

      let vipTag = 'Nenhum'
      let beta = false
      if (userProfile && !profileError) {
        vipTag = userProfile.vip_tag || 'Nenhum'
        beta = userProfile.beta === true
      }

      const user = { id: data.id, username: data.username, avatar_url: avatarUrl, vip_tag: vipTag, beta }
      localStorage.setItem('discord_user', JSON.stringify(user))
      window.location.href = '/perfil'
    }

    const params = new URLSearchParams(window.location.hash.substring(1))
    const token = params.get('access_token')
    if (token) fetchDiscordUser(token)
  }, [])

  return (
    <div className="main-content">
      <h1>Conectando ao Discord...</h1>
    </div>
  )
}

const AdminPanel = ({ user, isAdmin, loadingAdmin }) => {
  const [activeTab, setActiveTab] = useState('lores')
  const [lores, setLores] = useState([])
  const [admins, setAdmins] = useState([])
  const [newAdminName, setNewAdminName] = useState('')
  const [newAdminDiscordId, setNewAdminDiscordId] = useState('')
  const [selectedLore, setSelectedLore] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [accountOptions, setAccountOptions] = useState([])
  const [selectedAccountId, setSelectedAccountId] = useState('')
  const [manualAccountId, setManualAccountId] = useState('')
  const [bulkVipTag, setBulkVipTag] = useState('VIP')
  const [bulkBetaEnabled, setBulkBetaEnabled] = useState(false)
  const [bulkUpdatingVip, setBulkUpdatingVip] = useState(false)

  const vipTags = VIP_TIER_OPTIONS

  const pendingLores = lores.filter(lore => lore.status === 'PENDENTE')
  const interviewLores = lores.filter(lore => lore.status === 'EM_ENTREVISTA')
  const approvedLores = lores.filter(lore => lore.status === 'APROVADA')
  const rejectedLores = lores.filter(lore => lore.status === 'RECUSADA')

  const fetchAllLores = useCallback(async () => {
    const { data, error } = await supabase.from('lores').select('*').order('created_at', { ascending: false })
    if (error) {
      console.error('Erro ao buscar lores:', error)
      alert('Erro ao carregar lores: ' + error.message)
      setLores([])
      return
    }

    const { data: vipStatuses, error: vipStatusesError } = await supabase
      .from('vips')
      .select('discord_id, vip_tag, beta')
      .not('discord_id', 'is', null)

    if (vipStatusesError) {
      console.error('Erro ao buscar status VIP e Beta das contas:', vipStatusesError)
    }

    const vipByDiscordId = (vipStatuses || []).reduce((acc, vip) => {
      if (vip && vip.discord_id) acc[vip.discord_id] = vip
      return acc
    }, {})

    const mergedLores = (data || []).map(lore => ({
      ...lore,
      vip_tag: vipByDiscordId[lore.discord_id]?.vip_tag || lore.vip_tag || 'Nenhum',
      beta: vipByDiscordId[lore.discord_id]?.beta === true
    }))

    setLores(mergedLores)
  }, [])

  const fetchAllAdmins = useCallback(async () => {
    const { data } = await supabase.from('admins').select('*')
    setAdmins(data || [])
  }, [])

  const fetchAccountOptions = useCallback(async () => {
    const { data, error } = await supabase
      .from('lores')
      .select('discord_id, discord_tag, vip_tag, created_at')
      .not('discord_id', 'is', null)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar contas para VIP:', error)
      return
    }

    const { data: vipsData, error: vipsError } = await supabase
      .from('vips')
      .select('discord_id, discord_username, vip_tag, beta')
      .not('discord_id', 'is', null)

    if (vipsError) {
      console.error('Erro ao buscar dados VIP das contas:', vipsError)
    }

    const groupedAccounts = (data || []).reduce((acc, lore) => {
      if (!lore.discord_id) return acc

      if (!acc[lore.discord_id]) {
        acc[lore.discord_id] = {
          discord_id: lore.discord_id,
          discord_tag: lore.discord_tag || 'Sem username',
          current_vip_tag: lore.vip_tag || 'Nenhum',
          total_whitelists: 0,
          beta: false
        }
      }

      acc[lore.discord_id].total_whitelists += 1

      if (acc[lore.discord_id].current_vip_tag === 'Nenhum' && lore.vip_tag) {
        acc[lore.discord_id].current_vip_tag = lore.vip_tag
      }

      return acc
    }, {})

    // Merge com dados da tabela vips - esta é a fonte de verdade para VIP e Beta
    ;(vipsData || []).forEach(vipRow => {
      if (!vipRow.discord_id) return

      if (!groupedAccounts[vipRow.discord_id]) {
        groupedAccounts[vipRow.discord_id] = {
          discord_id: vipRow.discord_id,
          discord_tag: vipRow.discord_username || 'Sem username',
          current_vip_tag: vipRow.vip_tag || 'Nenhum',
          total_whitelists: 0,
          beta: vipRow.beta === true
        }
      } else {
        // A tabela vips é a fonte de verdade - sempre sobrescreve lores
        groupedAccounts[vipRow.discord_id].discord_tag = groupedAccounts[vipRow.discord_id].discord_tag || vipRow.discord_username || 'Sem username'
        groupedAccounts[vipRow.discord_id].current_vip_tag = vipRow.vip_tag || 'Nenhum'
        groupedAccounts[vipRow.discord_id].beta = vipRow.beta === true
      }
    })

    setAccountOptions(Object.values(groupedAccounts))
  }, [])

  const updateStatus = async (id, status) => {
    let motivo = null

    if (status === 'RECUSADA') {
      motivo = prompt('Digite o motivo da recusa para o jogador saber o que precisa corrigir:')

      if (!motivo || !motivo.trim()) {
        alert('Você precisa informar o motivo da recusa.')
        return
      }

      motivo = motivo.trim()
    }

    const payload = status === 'RECUSADA'
      ? { status, motivo }
      : { status, motivo: null }

    const { error } = await supabase.from('lores').update(payload).eq('id', id)

    if (error) {
      alert('Erro ao atualizar status: ' + error.message)
      return
    }

    if (selectedLore && selectedLore.id === id) {
      setSelectedLore(prev => prev ? { ...prev, ...payload } : prev)
    }

    await fetchAllLores()
  }

  const deleteLore = async (id) => {
    const confirmDelete = confirm('Tem certeza que deseja deletar esta whitelist? Essa ação não poderá ser desfeita.')
    if (!confirmDelete) return

    const { error } = await supabase.from('lores').delete().eq('id', id)

    if (error) {
      alert('Erro ao deletar whitelist: ' + error.message)
      return
    }

    if (selectedLore && selectedLore.id === id) {
      setSelectedLore(null)
      setModalOpen(false)
    }

    await fetchAllLores()
    await fetchAccountOptions()
    alert('Whitelist deletada com sucesso.')
  }

  const applyVipToAccount = async () => {
    const targetAccountId = manualAccountId.trim() || selectedAccountId

    if (!targetAccountId) {
      alert('Selecione uma conta ou digite manualmente o ID da conta.')
      return
    }

    setBulkUpdatingVip(true)

    const vipValue = bulkVipTag === 'Nenhum' ? null : bulkVipTag
    const betaValue = bulkBetaEnabled
    const selectedAccount = accountOptions.find(account => account.discord_id === selectedAccountId)
    const targetDiscordUsername = selectedAccount?.discord_tag || targetAccountId

    // 1) Try updating the VIP tag and beta access on the vips table. If no row was updated, insert a new vips record.
    let userError = null
    try {
      const { data: updateData, error: updateErr } = await supabase
        .from('vips')
        .update({ vip_tag: vipValue, beta: betaValue })
        .eq('discord_id', targetAccountId)
        .select('discord_id')

      if (updateErr) throw updateErr

      if (!updateData || updateData.length === 0) {
        const { data: insertData, error: insertErr } = await supabase
          .from('vips')
          .insert([{ discord_id: targetAccountId, discord_username: targetDiscordUsername, vip_tag: vipValue, beta: betaValue }])
        if (insertErr) throw insertErr
      }
    } catch (err) {
      userError = err
    }

    if (userError) {
      setBulkUpdatingVip(false)
      alert('Erro ao atualizar VIP da conta: ' + userError.message)
      return
    }

    // 2) Update existing lores for visual consistency (update both vip_tag and beta if table supports it)
    const updatePayload = { vip_tag: vipValue }
    
    // Also update beta in lores if the field exists
    const { data, error } = await supabase
      .from('lores')
      .update(updatePayload)
      .eq('discord_id', targetAccountId)
      .select('id')

    setBulkUpdatingVip(false)

    if (error) {
      alert('VIP aplicado na conta, mas houve erro ao atualizar as whitelists: ' + error.message)
      // proceed — user VIP updated, lores update failed
    }

    const totalAtualizado = data?.length || 0

    alert(`VIP aplicado na conta. Whitelists atualizadas: ${totalAtualizado} entrada(s).`)

    setSelectedAccountId('')
    setManualAccountId('')
    setBulkVipTag('VIP')
    setBulkBetaEnabled(false)
    
    // Wait a moment to ensure database is updated before refetch
    await new Promise(resolve => setTimeout(resolve, 300))
    
    await fetchAllLores()
    await fetchAccountOptions()
  }

  const addAdmin = async () => {
    const discordUsername = newAdminName.trim()
    const discordId = newAdminDiscordId.trim()

    if (!discordUsername) return alert('Digite um nome de usuário do Discord.')
    if (!/^\d+$/.test(discordId)) return alert('Digite um ID de usuário Discord válido (somente números).')

    const { error } = await supabase.from('admins').insert([{
      discord_id: discordId,
      discord_username: discordUsername
    }])
    if (error) {
      alert('Erro ao adicionar admin: ' + error.message)
    } else {
      setNewAdminName('')
      setNewAdminDiscordId('')
      await fetchAllAdmins()
    }
  }

  const removeAdmin = async (id) => {
    if (!confirm('Tem certeza que deseja remover este administrador?')) return
    await supabase.from('admins').delete().eq('id', id)
    fetchAllAdmins()
  }

  useEffect(() => {
    // Carrega os dados do painel quando o componente monta (IIFE assíncrona)
    void (async () => {
      await fetchAllLores()
      await fetchAllAdmins()
      await fetchAccountOptions()
    })()
  }, [fetchAllLores, fetchAllAdmins, fetchAccountOptions])

  if (!user) return <div className="main-content"><h1>Acesso negado. Faça login como administrador.</h1></div>

  if (loadingAdmin) {
    return <div className="main-content"><h1>Verificando permissões...</h1></div>
  }

  if (!isAdmin) {
    return <div className="main-content"><h1>Acesso negado. Faça login como administrador.</h1></div>
  }

  return (
    <PageTransition>
      <div className="main-content">
        <div className="admin-container">
          <h1 className="admin-title">👑 Painel Administrativo</h1>

          <div className="admin-nav">
            <button
              className={`admin-nav-btn ${activeTab === 'lores' ? 'active' : ''}`}
              onClick={() => setActiveTab('lores')}
            >
              Gerenciar Lores
            </button>
            <button
              className={`admin-nav-btn ${activeTab === 'admins' ? 'active' : ''}`}
              onClick={() => setActiveTab('admins')}
            >
              Gerenciar Admins
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'lores' && (
              <motion.div key="lores-tab" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="lores-management-grid">
                <div className="lore-column">
                  <h2>Em Análise</h2>
                  <div className="admin-grid">
                    {pendingLores.length === 0 ? (
                      <p className="no-lores-message">Nenhuma lore pendente.</p>
                    ) : (
                      pendingLores.map(l => (
                        <AdminLoreCard
                          key={l.id}
                          lore={l}
                          onOpen={(lore) => { setSelectedLore(lore); setModalOpen(true) }}
                          onUpdateStatus={updateStatus}
                          onDeleteLore={deleteLore}
                        />
                      ))
                    )}
                  </div>
                </div>

                <div className="lore-column">
                  <h2>Em entrevista</h2>
                  <div className="admin-grid">
                    {interviewLores.length === 0 ? (
                      <p className="no-lores-message">Nenhuma lore aguardando entrevista.</p>
                    ) : (
                      interviewLores.map(l => (
                        <AdminLoreCard
                          key={l.id}
                          lore={l}
                          onOpen={(lore) => { setSelectedLore(lore); setModalOpen(true) }}
                          onUpdateStatus={updateStatus}
                          onDeleteLore={deleteLore}
                        />
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
                        <AdminLoreCard
                          key={l.id}
                          lore={l}
                          onOpen={(lore) => { setSelectedLore(lore); setModalOpen(true) }}
                          onUpdateStatus={updateStatus}
                          onDeleteLore={deleteLore}
                        />
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
                        <AdminLoreCard
                          key={l.id}
                          lore={l}
                          onOpen={(lore) => { setSelectedLore(lore); setModalOpen(true) }}
                          onUpdateStatus={updateStatus}
                          onDeleteLore={deleteLore}
                        />
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'admins' && (
              <motion.div key="admins-tab" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="admin-manage-section">
                <div className="add-admin-form">
                  <h3>Adicionar Novo Admin</h3>
                  <input
                    type="text"
                    placeholder="Username do Discord"
                    value={newAdminName}
                    onChange={e => setNewAdminName(e.target.value)}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="ID do usuário Discord"
                    value={newAdminDiscordId}
                    onChange={e => setNewAdminDiscordId(e.target.value)}
                  />
                  <button onClick={addAdmin}>Adicionar</button>
                </div>

                <div className="admin-list">
                  <h3>Administradores Atuais</h3>
                  {admins.map(admin => (
                    <div key={admin.id} className="admin-list-item">
                      <span>{admin.discord_username || admin.discord_id} ({admin.discord_id})</span>
                      <button onClick={() => removeAdmin(admin.id)} className="btn-remove-admin">Remover</button>
                    </div>
                  ))}
                </div>

                <div className="admin-bulk-vip">
                  <div className="admin-bulk-vip-header">
                    <h3>Gerenciar VIP por Conta</h3>
                    <p>
                      Selecione o ID da conta e aplique o cargo VIP pago para todas as whitelists vinculadas a esse usuário.
                    </p>
                  </div>

                  <div className="admin-bulk-vip-form">
                    <div className="admin-bulk-vip-field">
                      <label>Selecionar conta cadastrada</label>
                      <select
                        value={selectedAccountId}
                        onChange={(e) => {
                          setSelectedAccountId(e.target.value)
                          setManualAccountId('')
                        }}
                      >
                        <option value="">Selecione uma conta</option>
                        {accountOptions.map(account => (
                          <option key={account.discord_id} value={account.discord_id}>
                            {account.discord_tag} | ID: {account.discord_id} | {account.total_whitelists} whitelist(s) | VIP atual: {account.current_vip_tag || 'Nenhum'}{account.beta ? ' + Beta' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="admin-bulk-vip-field">
                      <label>Ou digite manualmente o ID da conta</label>
                      <input
                        type="text"
                        placeholder="Ex: 123456789012345678"
                        value={manualAccountId}
                        onChange={(e) => {
                          setManualAccountId(e.target.value)
                          setSelectedAccountId('')
                        }}
                      />
                    </div>

                    <div className="admin-bulk-vip-field">
                      <label>Tag VIP paga</label>
                      <select value={bulkVipTag} onChange={(e) => setBulkVipTag(e.target.value)}>
                        {vipTags.map(tag => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                    </div>

                    <div className="admin-bulk-vip-field">
                      <label>Ativar versão Beta</label>
                      <input
                        type="checkbox"
                        checked={bulkBetaEnabled}
                        onChange={(e) => setBulkBetaEnabled(e.target.checked)}
                      />
                    </div>

                    <div className="admin-bulk-vip-actions">
                      <button onClick={applyVipToAccount} className="btn-bulk-vip" disabled={bulkUpdatingVip}>
                        {bulkUpdatingVip ? 'Aplicando VIP...' : 'Aplicar VIP em todas as whitelists'}
                      </button>
                    </div>
                  </div>
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
                <div className="modal-header-lore">
                  <h2>Análise de Lore: {selectedLore.nome}</h2>
                  <div className={`status-badge status--${selectedLore.status.toLowerCase()}`}>{STATUS_LABELS[selectedLore.status] || selectedLore.status}</div>
                </div>

                  <div className="modal-info-grid">
                    <div className="info-item">
                      <User size={18} />
                      <span><strong>Nick:</strong> {selectedLore.nick}</span>
                    </div>
                    <div className="info-item">
                      <ShieldCheck size={18} />
                      <span><strong>Raça:</strong> {selectedLore.raca}</span>
                    </div>
                    <div className="info-item">
                      <Star size={18} />
                      <span><strong>Idade:</strong> {selectedLore.idade}</span>
                    </div>
                    {selectedLore.discord_id && (
                      <div className="info-item">
                        <DollarSign size={18} />
                        <span><strong>ID da conta:</strong> {selectedLore.discord_id}</span>
                      </div>
                    )}
                    <div className="info-item info-item--vip">
                      <Heart size={18} />
                      <span><strong>VIP atual:</strong> {getVipDisplayValue(selectedLore.vip_tag)}</span>
                    </div>
                  </div>


                <div className="modal-historia-content">
                  <h3><BookOpen size={20} /> História:</h3>
                  <p>{selectedLore.historia}</p>
                </div>

                {selectedLore.status === 'RECUSADA' && selectedLore.motivo && (
                  <div className="modal-motivo-recusa">
                    <h3><X size={20} /> Motivo da Recusa:</h3>
                    <p>{selectedLore.motivo}</p>
                  </div>
                )}

                  <div className="admin-modal-actions">
                    <div className="admin-vip-display-only">
                      <span className="admin-vip-display-label">Tag VIP da conta:</span>
                      <span className={getVipClassName(selectedLore.vip_tag)}>
                        {getVipDisplayValue(selectedLore.vip_tag)}
                      </span>
                    </div>
                    <div className="admin-decision-buttons">
                      {selectedLore.status === 'PENDENTE' && (
                        <>
                          <button onClick={() => updateStatus(selectedLore.id, 'EM_ENTREVISTA')} className="btn-approve">Aprovar história</button>
                          <button onClick={() => updateStatus(selectedLore.id, 'RECUSADA')} className="btn-reject">Recusar Lore</button>
                        </>
                      )}
                      {selectedLore.status === 'EM_ENTREVISTA' && (
                        <button onClick={() => updateStatus(selectedLore.id, 'APROVADA')} className="btn-approve">Aprovar entrevista</button>
                      )}
                      {(selectedLore.status === 'APROVADA' || selectedLore.status === 'RECUSADA' || selectedLore.status === 'EM_ENTREVISTA') && (
                        <button onClick={() => updateStatus(selectedLore.id, 'PENDENTE')} className="btn-revert">Reverter para Pendente</button>
                      )}
                      <button onClick={() => deleteLore(selectedLore.id)} className="btn-delete-lore">Deletar Lore</button>
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

  const checkAdmin = useCallback(async (discordId, username) => {
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('discord_id', discordId)

    const isUserAdmin = (data && data.length > 0) || username === 'circoaleorico' || username === 'xaveiroxd'

    setIsAdmin(isUserAdmin)
    setLoadingAdmin(false)

    if (error) console.error('Erro ao verificar admin:', error)
  }, [])

  useEffect(() => {
    const initializeUser = async () => {
      const savedUser = localStorage.getItem('discord_user')
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser)

        const { data: vipProfile, error: vipError } = await supabase
          .from('vips')
          .select('vip_tag, beta')
          .eq('discord_id', parsedUser.id)
          .single()

        if (!vipError && vipProfile) {
          const refreshedUser = {
            ...parsedUser,
            vip_tag: vipProfile.vip_tag || 'Nenhum',
            beta: vipProfile.beta === true
          }
          localStorage.setItem('discord_user', JSON.stringify(refreshedUser))
          setUser(refreshedUser)
        } else {
          setUser(parsedUser)
        }

        await checkAdmin(parsedUser.id, parsedUser.username)
      } else {
        setLoadingAdmin(false)
      }
    }

    initializeUser()
  }, [checkAdmin])

  return (
    <Router>
      <div className="container">
        <SocialLinks />
        <aside className="sidebar">
          <Link to="/" className="logo-section">
            <img src="/logo.png" alt="Logo" className="sidebar-logo" />
            <img src="/logonovaSemfundo.png" alt="Musae Eras" className="sidebar-title" />
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
              <button className="sidebar-login-btn" onClick={() => { localStorage.removeItem('discord_user'); window.location.href = '/' }}>Sair</button>
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
          <Route
            path="/admin"
            element={
              loadingAdmin
                ? <div className="main-content"><h1>Verificando permissões...</h1></div>
                : isAdmin
                  ? <AdminPanel user={user} isAdmin={isAdmin} loadingAdmin={loadingAdmin} />
                  : <Navigate to="/" replace />
            }
          />
          <Route path="/apoios" element={<Apoios />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
