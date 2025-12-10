// src/components/ContentRenderer.jsx
// РЕНДЕРЕР КОНТЕНТА ДЛЯ УРОКОВ

import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Clock, Globe } from 'lucide-react';

function ContentRenderer({ content }) {
  if (!content) return null;

  switch (content.type) {
    
    // 📝 ТЕКСТ
    case 'text':
      return (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: '1.125rem',
            lineHeight: 1.8,
            color: '#e5e7eb',
            marginBottom: '1rem'
          }}
        >
          {content.text}
        </motion.p>
      );

    // 📋 СПИСОК
    case 'list':
      return (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            listStyle: 'none',
            padding: 0,
            marginBottom: '1.5rem'
          }}
        >
          {content.items.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem',
                marginBottom: '0.75rem',
                padding: '0.75rem',
                background: 'rgba(55, 65, 81, 0.3)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <CheckCircle size={20} style={{ color: '#10b981', flexShrink: 0, marginTop: '0.25rem' }} />
              <span style={{ color: '#e5e7eb', fontSize: '1rem', lineHeight: 1.6 }}>
                {item}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      );

    // 💬 ЦИТАТА
    case 'quote':
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))',
            border: '2px solid rgba(59, 130, 246, 0.3)',
            borderLeft: '4px solid #3b82f6',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            marginBottom: '1.5rem',
            position: 'relative'
          }}
        >
          <div style={{ fontSize: '3rem', position: 'absolute', top: '0.5rem', left: '1rem', color: 'rgba(59, 130, 246, 0.2)' }}>
            "
          </div>
          <p style={{
            fontSize: '1.125rem',
            fontStyle: 'italic',
            color: '#bfdbfe',
            marginBottom: '0.5rem',
            paddingLeft: '2rem'
          }}>
            {content.text}
          </p>
          {content.author && (
            <p style={{
              fontSize: '0.875rem',
              color: '#60a5fa',
              textAlign: 'right',
              fontWeight: 600
            }}>
              — {content.author}
            </p>
          )}
        </motion.div>
      );

    // ⏰ ВРЕМЕННАЯ ШКАЛА
    case 'timeline':
      return (
        <div style={{ marginBottom: '2rem' }}>
          {content.events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1.5rem',
                position: 'relative'
              }}
            >
              {/* Timeline line */}
              {index < content.events.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '1.25rem',
                  top: '3rem',
                  bottom: '-1.5rem',
                  width: '2px',
                  background: 'linear-gradient(to bottom, #3b82f6, rgba(59, 130, 246, 0.3))'
                }} />
              )}
              
              {/* Timeline dot */}
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                zIndex: 10
              }}>
                <Clock size={16} style={{ color: 'white' }} />
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#60a5fa',
                  fontWeight: 700,
                  marginBottom: '0.25rem'
                }}>
                  {event.period}
                </div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'white',
                  marginBottom: '0.25rem'
                }}>
                  {event.item}
                </div>
                <div style={{
                  fontSize: '0.9375rem',
                  color: '#9ca3af'
                }}>
                  {event.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );

    // 🎴 КАРТОЧКИ
    case 'cards':
      return (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {content.cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              style={{
                background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.95), rgba(55, 65, 81, 0.9))',
                backdropFilter: 'blur(20px)',
                padding: '1.5rem',
                borderRadius: '1rem',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>
                {card.icon}
              </div>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                {card.title}
              </h4>
              <p style={{
                fontSize: '0.9375rem',
                color: '#d1d5db',
                lineHeight: 1.6
              }}>
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      );

    // 🌍 СЕТКА
    case 'grid':
      return (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {content.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              style={{
                background: 'rgba(55, 65, 81, 0.5)',
                padding: '1rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                {item.flag}
              </div>
              <div style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'white',
                marginBottom: '0.25rem'
              }}>
                {item.name}
              </div>
              <div style={{
                fontSize: '0.8125rem',
                color: '#10b981',
                fontWeight: 600
              }}>
                {item.currency}
              </div>
            </motion.div>
          ))}
        </div>
      );

    // 💡 ПРИМЕР
    case 'example':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1))',
            border: '2px solid rgba(16, 185, 129, 0.3)',
            padding: '1.5rem',
            borderRadius: '1rem',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.75rem'
          }}>
            <Sparkles size={20} style={{ color: '#10b981' }} />
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: 800,
              color: '#6ee7b7'
            }}>
              {content.title}
            </h4>
          </div>
          <p style={{
            fontSize: '1rem',
            color: '#d1fae5',
            lineHeight: 1.7
          }}>
            {content.text}
          </p>
        </motion.div>
      );

    // 🎈 ИНТЕРЕСНЫЙ ФАКТ
    case 'fun-fact':
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.1))',
            border: '2px solid rgba(251, 191, 36, 0.3)',
            padding: '1.25rem',
            borderRadius: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>💡</div>
          <p style={{
            fontSize: '1rem',
            color: '#fde68a',
            lineHeight: 1.6,
            fontWeight: 600
          }}>
            {content.text}
          </p>
        </motion.div>
      );

    // 🖼️ ИЗОБРАЖЕНИЕ
    case 'image':
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            marginBottom: '2rem',
            borderRadius: '1rem',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <img
            src={content.url}
            alt={content.caption || ''}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
          {content.caption && (
            <div style={{
              background: 'rgba(31, 41, 55, 0.95)',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              color: '#9ca3af',
              textAlign: 'center'
            }}>
              {content.caption}
            </div>
          )}
        </motion.div>
      );

    default:
      return null;
  }
}

export default ContentRenderer;