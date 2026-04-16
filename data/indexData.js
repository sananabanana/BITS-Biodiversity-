const INDEX_DATA = {
    shannon: {
      icon:      '📈',
      title:     'Shannon Diversity Index – What It Shows',
      colHeader: "Shannon (H′)",
      rows: [
        { habitat: 'Gardens & Lawns', value: 0.815, color: '#4facfe' },
        { habitat: 'Forested Areas',  value: 1.195, color: '#feca57' },
        { habitat: 'Water Bodies',    value: 0.552, color: '#0fbcf9' },
        { habitat: 'Urban Areas',     value: 1.368, color: '#ff6b6b' }
      ],
      insights: [
        { title: '🏘️ Urban areas',     text: 'Highest value — the greatest variety with a fairly balanced presence. Mixed spaces create diverse niches.' },
        { title: '🌲 Forested areas',   text: 'Moderate diversity; multiple species present though trees and terrestrial plants still dominate.' },
        { title: '🌺 Gardens & lawns', text: 'Lower diversity, mainly because these are landscaped and contain a limited variety of planted species.' },
        { title: '💧 Water bodies',     text: 'Lowest diversity; heavily dominated by aquatic plants with few fish, insects, and birds.' }
      ],
      takeaway: 'Urban areas, even though human-modified, support the most diverse and balanced communities, while water bodies are specialised habitats dominated by aquatic plants.'
    },
    simpson: {
      icon:      '📉',
      title:     "Simpson's Diversity Index – What It Shows",
      colHeader: "Simpson's (1−D)",
      rows: [
        { habitat: 'Gardens & Lawns', value: 0.467, color: '#4facfe' },
        { habitat: 'Forested Areas',  value: 0.616, color: '#feca57' },
        { habitat: 'Water Bodies',    value: 0.266, color: '#0fbcf9' },
        { habitat: 'Urban Areas',     value: 0.708, color: '#ff6b6b' }
      ],
      insights: [
        { title: '🏘️ Urban areas',     text: 'Highest value — no single species dominates; the community is well-balanced.' },
        { title: '🌲 Forested areas',   text: 'Fairly good balance, but trees and terrestrial plants still dominate to some extent.' },
        { title: '🌺 Gardens & lawns', text: 'Lower value; a few planted species such as trees and shrubs make up most of the population.' },
        { title: '💧 Water bodies',     text: 'Lowest value; strongly dominated by aquatic plants with very little from other groups.' }
      ],
      takeaway: "Higher Simpson's value means less dominance. Urban areas are the least dominated by any one species; water bodies are heavily dominated by aquatic plants."
    },
    evenness: {
      icon:      '⚖️',
      title:     'Evenness (J) Index – What It Shows',
      colHeader: 'Evenness (J)',
      rows: [
        { habitat: 'Gardens & Lawns', value: 0.455, color: '#4facfe' },
        { habitat: 'Forested Areas',  value: 0.575, color: '#feca57' },
        { habitat: 'Water Bodies',    value: 0.398, color: '#0fbcf9' },
        { habitat: 'Urban Areas',     value: 0.703, color: '#ff6b6b' }
      ],
      insights: [
        { title: '🏘️ Urban areas',     text: 'Highest evenness — species are more evenly distributed and no single group dominates.' },
        { title: '🌲 Forested areas',   text: 'Moderate evenness with some balance but a noticeable dominance of trees and terrestrial plants.' },
        { title: '🌺 Gardens & lawns', text: 'Lower evenness; a few planted species dominate, leaving less room for variety.' },
        { title: '💧 Water bodies',     text: 'Lowest evenness; most of the habitat is occupied by aquatic plants.' }
      ],
      takeaway: 'Urban areas have the most balanced distribution of species, while water bodies are highly uneven with one group dominating most of the space.'
    }
  };