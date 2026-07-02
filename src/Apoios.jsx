import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // eslint-disable-line no-unused-vars
import { Music, Disc, Volume2, Mic, DollarSign, X } from 'lucide-react' // Importando ícones musicais
import PageTransition from './PageTransition'

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

const vipArts = {
  acorde: ['/ARTEVIP1.jpg', '/ARTEVIP2.jpg', '/ARTEVIP3.jpg'],
  crescendo: ['/ARTEVIP+1.jpg', '/ARTEVIP+2.jpg', '/ARTEVIP+4.jpg'],
  'obra-prima': ['/ARTEVIP++1.jpg', '/ARTEVIP++2.jpg', '/ARTEVIP++3.jpg', '/ARTEVIP++4.jpg']
}

const Apoios = () => {
  const [selectedImage, setSelectedImage] = useState(null)

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

          <div className="vip-arts-wrapper">
            <div className="beta-arts-section vip-arts-section">
              <h2>O Primeiro Acorde</h2>
              <div className="beta-arts-grid">
                {['/ARTEVIP1.jpg', '/ARTEVIP2.jpg', '/ARTEVIP3.jpg'].map((src, index) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt={`O Primeiro Acorde ${index + 1}`}
                    className="beta-art"
                    onClick={() => setSelectedImage(src)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  />
                ))}
              </div>
            </div>

            <div className="beta-arts-section vip-arts-section">
              <h2>O Crescendo</h2>
              <div className="beta-arts-grid">
                {['/ARTEVIP+1.jpg', '/ARTEVIP+2.jpg', '/ARTEVIP+3.jpg', '/ARTEVIP+4.jpg'].map((src, index) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt={`O Crescendo ${index + 1}`}
                    className="beta-art"
                    onClick={() => setSelectedImage(src)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  />
                ))}
              </div>
            </div>

            <div className="beta-arts-section vip-arts-section">
              <h2>Nossa Obra-Prima</h2>
              <div className="beta-arts-grid">
                {['/ARTEVIP++1.jpg', '/ARTEVIP++2.jpg', '/ARTEVIP++3.jpg', '/ARTEVIP++4.jpg'].map((src, index) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt={`Nossa Obra-Prima ${index + 1}`}
                    className="beta-art"
                    onClick={() => setSelectedImage(src)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="beta-arts-section">
            <h2>Acesso Antecipado (Beta)</h2>
            <div className="beta-arts-grid">
              <motion.img
                src="/ARTEBETA1.jpg"
                alt="Beta Art 1"
                className="beta-art"
                onClick={() => setSelectedImage('/ARTEBETA1.jpg')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <motion.img
                src="/ARTEBETA2.jpg"
                alt="Beta Art 2"
                className="beta-art"
                onClick={() => setSelectedImage('/ARTEBETA2.jpg')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.img
                src="/ARTEBETA3.jpg"
                alt="Beta Art 3"
                className="beta-art"
                onClick={() => setSelectedImage('/ARTEBETA3.jpg')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </div>
          </div>
          
          <div className="boost-arts-section">
            <h2>Boosts no Discord</h2>
            <div className="beta-arts-grid">
              <motion.img
                src="/ARTEBOOST1.jpg"
                alt="Boost Art 1"
                className="beta-art"
                onClick={() => setSelectedImage('/ARTEBOOST1.jpg')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
              <motion.img
                src="/ARTEBOOST2.jpg"
                alt="Boost Art 2"
                className="beta-art"
                onClick={() => setSelectedImage('/ARTEBOOST2.jpg')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.img
                src="/ARTEBOOST3.jpg"
                alt="Boost Art 3"
                className="beta-art"
                onClick={() => setSelectedImage('/ARTEBOOST3.jpg')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="beta-art-modal-overlay"
              onClick={() => setSelectedImage(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="beta-art-modal-content"
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <button
                  className="beta-art-modal-close"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={28} />
                </button>
                <img src={selectedImage} alt="Beta Art Expandida" className="beta-art-expanded" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}

export default Apoios
