const HABITAT_DATA = {
    gardens: {
      icon:     '🌺',
      title:    'Gardens and Lawns',
      subtitle: '(Rock garden, Hostel QTs, etc)',
      rows: [
        { label: 'Tree',               count: 2070, color: '#7cb5ec' },
        { label: 'Terrestrial Plants', count:  845, color: '#90ed7d' },
        { label: 'Shrubs',             count:  100, color: '#f7a35c' },
        { label: 'Bird',               count:   31, color: '#8085e9' },
        { label: 'Mammals',            count:   15, color: '#f15c80' },
        { label: 'Insect',             count:    5, color: '#e4d354' }
      ],
      desc: 'The species composition in Gardens is heavily dominated by Trees and Terrestrial Plants, which together make up the vast majority of the population. Overall, Gardens are plant-rich environments with minimal representation of animal species.'
    },
    forests: {
      icon:     '🌲',
      title:    'Forested Areas',
      subtitle: '(Quadrats behind and around NAB)',
      rows: [
        { label: 'Terrestrial Plants', count: 1521, color: '#7cb5ec' },
        { label: 'Tree',               count:  680, color: '#434348' },
        { label: 'Shrubs',             count:  295, color: '#90ed7d' },
        { label: 'Insects',            count:  188, color: '#f7a35c' },
        { label: 'Bird',               count:   54, color: '#8085e9' },
        { label: 'Mammal',             count:    5, color: '#f15c80' },
        { label: 'Reptiles',           count:    3, color: '#e4d354' },
        { label: 'Amphibian',          count:    1, color: '#2b908f' }
      ],
      desc: 'The species composition in Forested Areas shows a strong dominance of Terrestrial Plants, followed by Trees, indicating dense vegetation and rich plant biodiversity. Faunal groups such as Insects and Mammals are present in moderate proportions, while Birds, Reptiles, and Amphibians make up very small fractions.'
    },
    urban: {
      icon:     '🏘️',
      title:    'Urban Areas',
      subtitle: '(Roads along CP, Acad Block, OFG, etc)',
      rows: [
        { label: 'Tree',               count: 465, color: '#7cb5ec' },
        { label: 'Terrestrial Plants', count: 338, color: '#90ed7d' },
        { label: 'Shrubs',             count: 292, color: '#f7a35c' },
        { label: 'Bird',               count:  59, color: '#8085e9' },
        { label: 'Insects',            count:  26, color: '#f15c80' },
        { label: 'Mammals',            count:  18, color: '#e4d354' },
        { label: 'Amphibians',         count:   1, color: '#2b908f' }
      ],
      desc: 'Urban areas show a more balanced distribution of species compared to forests and gardens. While trees and terrestrial plants still dominate, their numbers are lower, indicating limited vegetation density. Shrubs, birds, and insects are relatively more common here than in gardens.'
    },
    water: {
      icon:     '💧',
      title:    'Water Bodies',
      subtitle: '(Lotus Pond, Pond near gate)',
      rows: [
        { label: 'Aquatic Plants', count: 354, color: '#7cb5ec' },
        { label: 'Fish',           count:  33, color: '#90ed7d' },
        { label: 'Insect',         count:  25, color: '#f7a35c' },
        { label: 'Bird',           count:   4, color: '#8085e9' }
      ],
      desc: 'Water bodies show a clear dominance of aquatic plants, which make up the vast majority of the species count. Fish and insects appear in moderate numbers as consumers. Overall, water ecosystems exhibit low diversity but strong ecological specialisation, with plants forming the foundation for all other aquatic life.'
    }
  };