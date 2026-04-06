import React from 'react'
import { motion } from 'framer-motion'
import { Music, Disc, Volume2, Mic, DollarSign } from 'lucide-react' // Importando ícones musicais
import { PageTransition } from './App' // Assumindo que PageTransition está exportado em App.jsx

const tiers = [
  {
    id: 'acorde',
    title: 'O Primeiro Acorde',
    price: 'R$ 15,00',
    color: '#f0a500', // Amarelo/Bronze
    icon: <Music size={24} />,
    benefits: [
      'Kit inicial e Mochila de Ouro customizável',
      'Um Artefato randomizado (sorteio!)',
      'Cargo de VIP no servidor (Discord e Minecraft)',
      'Acesso a chats exclusivos com spoilers extras',
    ],
    details: 'Mesmo sendo nosso tier mais baixo, aqui você já garante várias coisas boas e nos ajuda a manter a sinfonia tocando.',
    kit: [
      '20 Carnes Assadas',
      'Materiais de Pedra (Espada, Picareta, Machado, Enxada e Pá)',
      '10 Tochas',
      '20 Pedras'
    ]
  },
  {
    id: 'crescendo',
    title: 'O Crescendo',
    price: 'R$ 30,00',
    color: '#d565e5', // Roxo/Prata
    icon: <Disc size={24} />,
    benefits: [
      'Kit inicial e Mochila de Ouro customizável',
      'Dois Artefatos randomizados (dobro de chance!)',
      'Cargo de Apoiador customizável (com o nome que você quiser)',
      'Cargo VIP+ no servidor',
      'Acesso a chats exclusivos com spoilers extras e mais',
      'Um disco de música personalizado dentro do jogo',
    ],
    details: 'Para quem quer mais! Neste tier intermediário, contamos com recompensas que aumentam sua imersão e exclusividade.',
    kit: [
      '20 Carnes Assadas',
      'Materiais de Pedra (Espada, Picareta, Machado, Enxada e Pá)',
      '10 Tochas',
      '20 Pedras'
    ]
  },
  {
    id: 'obra-prima',
    title: 'Nossa Obra-Prima',
    price: 'R$ 60,00',
    color: '#23a559', // Verde/Diamante
    icon: <Mic size={24} />,
    benefits: [
      'Kit inicial e Mochila de Diamante customizável',
      'Uma Pelúcia Colecionável Aleatória',
      'Três Artefatos Randomizados (verdadeiro colecionador!)',
      'Cargo de Apoiador customizável',
      'Cargo VIP++ no servidor',
      'Poder de Lore: Escolha um acontecimento oficial para a história do seu personagem',
      'Dois discos de música personalizados dentro do jogo',
    ],
    details: 'O ápice do apoio! Se você quer o máximo de exclusividade e deixar sua marca na história do servidor, este é o seu lugar.',
    kit: [
      '20 Carnes Assadas',
      'Materiais de Pedra (Espada, Picareta, Machado, Enxada e Pá)',
      '10 Tochas',
      '20 Pedras'
    ]
  },
  {
    id: 'acesso-antecipado',
    title: 'Acesso Antecipado (Beta)',
    price: 'R$ 20,00',
    color: '#f23f43', // Vermelho/Beta
    icon: <Volume2 size={24} />,
    benefits: [
      'Kit Mochila de Ouro customizado',
      'Um Artefato randomizado',
      'Acesso ao servidor uma semana antes de todo mundo',
    ],
    details: 'Seja um dos primeiros a pisar em Chrona! Garanta seu lugar na história e nos ajude a testar o servidor antes da abertura oficial.',
    kit: [
      '20 Carnes Assadas',
      'Materiais de Pedra (Espada, Picareta, Machado, Enxada e Pá)',
      '10 Tochas',
      '20 Pedras'
    ]
  }
]

const Apoios = () => {
  return (
    <PageTransition>
      <div className="main-content">
        <div className="apoios-container">
          <div className="apoios-header">
            <h1>Apoie o Musae e Seja Parte Dessa História</h1>
            <p className="apoios-intro-text">
              Manter um servidor vivo é trabalhoso e exige paixão. Se você acredita no nosso projeto e quer ver ele crescer, seu apoio faz toda a diferença! Preparamos recompensas incríveis para quem decide embarcar nessa jornada conosco.
            </p>
          </div>

          <div className="artefatos-info">
            <h2>Os Artefatos: O Mistério</h2>
            <p>
              Eles não são itens normais. Pedimos para um modmaker criar relíquias que não existem em nenhum outro mod por aí. Relíquias antigas, passadas de mão em mão ao longo dos séculos. Ninguém sabe mais para que elas servem, mas o legal é: elas têm poderes!
            </p>
            <p>
              Efeitos especiais que mantemos em segredo por enquanto, pois queremos que vocês descubram na raça. Quem tem um desses anéis consegue desbloquear conversas secretas com NPCs, tipo se tivesse viajado em primeira classe para chegar aonde a história acontece.
            </p>
            <p className="artefatos-roll">
              <strong>Atenção:</strong> Você receberá Artefatos randomizados. A sorte entra em jogo: a gente rola para decidir qual anel você ganha. É tipo abrir um presente sem saber o que vem dentro! (A rolagem só vai acontecer na abertura do servidor).
            </p>
          </div>

          <div className="tiers-grid">
            {tiers.map(tier => (
              <motion.div
                key={tier.id}
                className={`tier-card tier-card--${tier.id}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * tiers.indexOf(tier) }}
              >
                <div className="tier-header" style={{ borderBottomColor: tier.color }}>
                  <div className="tier-icon" style={{ color: tier.color }}>{tier.icon}</div>
                  <h3 className="tier-title">{tier.title}</h3>
                  <p className="tier-price" style={{ color: tier.color }}>{tier.price}</p>
                </div>
                <p className="tier-details">{tier.details}</p>
                
                <div className="tier-benefits">
                  <h4>Benefícios Exclusivos:</h4>
                  <ul>
                    {tier.benefits.map((benefit, index) => (
                      <li key={index}><Disc size={16} style={{ color: tier.color }} /> {benefit}</li>
                    ))}
                  </ul>
                </div>

                <div className="tier-kit">
                  <h4>Kit Inicial (Base):</h4>
                  <ul>
                    {tier.kit.map((item, index) => (
                      <li key={index}><Music size={16} style={{ color: tier.color }} /> {item}</li>
                    ))}
                  </ul>
                </div>
                
                <a href="LINK_PARA_PAGAMENTO" target="_blank" className="tier-btn" style={{ backgroundColor: tier.color }}>
                  Quero Apoiar! <DollarSign size={18} />
                </a>
              </motion.div>
            ))}
          </div>
          
          <div className="discord-boost-info">
            <h2>Boosts no Discord</h2>
            <p>
              Para quem quer apoiar, mas prefere fazer pelo Discord, a gente tem uma forma legal de agradecer. Você ganha um cargo especial chamado "Patrocinador", acesso a chats que só vocês e os VIPs veem (com uns spoilers a mais bem legais sobre o que tá vindo), e ainda ganha um áudio personalizado só seu no servidor, que de preferência seja engraçadinho.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default Apoios
