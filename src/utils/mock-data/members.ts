// Mock data for research team members
export interface Person {
  id: number;
  name: string;
  personalPageUrl: string;
  position: 'Faculty' | 'PhD Students' | 'MS Students' | 'Alumni';
  enrollYear: number;
  profileImage: string;
  interest: string;
}

export const mockPeople: Person[] = [
  // Faculty
  {
    "id": 1,
    "name": 'Board of Governors and Distinguished Professor of CS. Dimitris Metaxas',
    "personalPageUrl": 'https://scholar.google.com/citations?user=a7VNhCIAAAAJ&hl=en',
    "position": 'Faculty',
    "enrollYear": 2001,
    "profileImage": 'https://deeplearn.irdta.eu/2022su/wp-content/uploads/sites/4/2021/10/Dimitris-N.-Metaxas.jpg',
    "interest": 'Board Interest including 2D/3D Vision Generative, Medical Imaging, Dynamical Modelling, LLM/VLM'
  },

  // PhD Students
  // Import the JSON data
  {
    "name": "Wenyi Mo",
    "interest": "Generative Models, MMLM, Reinforcement Learning",
    "profileImage": "/images/members/Wenyi_Mo.jpg",
    "id": 2,
    "personalPageUrl": "https://scholar.google.com/citations?user=e3s9h8MAAAAJ",
    "enrollYear": 2025,
    "position": "PhD Students"
  },
  {
    "name": "Yanting Yang",
    "interest": "Embodied AI, MLLM, Reinforcement Learning",
    "profileImage": "/images/members/Yanting_Yang.jpg",
    "id": 3,
    "personalPageUrl": "https://scholar.google.com/citations?user=UXRnnz8AAAAJ&hl=en",
    "enrollYear": 2025,
    "position": "PhD Students"
  },
  {
    "name": "Quyen Tran",
    "interest": "Continual Learning, VLM, LLM",
    "profileImage": "/images/members/Quyen_Tran.jpg",
    "id": 4,
    "personalPageUrl": "https://scholar.google.com/citations?hl=en&user=ZtuZhrMAAAAJ&view_op=list_works&sortby=pubdate",
    "enrollYear": 2025,
    "position": "PhD Students"

  },
  {
    "name": "Quang Nguyen",
    "interest": "MLLM, 3D/Video Generative",
    "profileImage": "/images/members/Quang_Nguyen.jpg",
    "id": 5,
    "personalPageUrl": "https://scholar.google.com/citations?user=SUuo7U4AAAAJ",
    "enrollYear": 2025,
    "position": "PhD Students"

  },
  {
    "name": "Quan Dao",
    "interest": "Image/Video Generation, 3D Generative",
    "profileImage": "/images/members/Quan_Dao.jpg",
    "id": 6,
    "personalPageUrl": "https://scholar.google.com/citations?user=g0RS3_kAAAAJ",
    "enrollYear": 2024,
    "position": "PhD Students"
  },
  {
    "name": "Yang Zhou",
    "interest": "MLLM, Agent, Medical",
    "profileImage": "/images/members/Yang_Zhou.jpg",
    "id": 7,
    "personalPageUrl": "https://scholar.google.com/citations?hl=en&user=BsQ8IUcAAAAJ&view_op=list_works&sortby=pubdate",
    "enrollYear": 2023,
    "position": "PhD Students"
  }, 
  {
    "name": "Can Jin",
    "interest": "Reinforcement Learning, LLM/Vision Efficiency",
    "profileImage": "/images/members/Can_Jin.jpg",
    "id": 8,
    "personalPageUrl": "https://scholar.google.com/citations?user=RK-8dz0AAAAJ&hl=en",
    "enrollYear": 2024,
    "position": "PhD Students"
  },
  {
    "name": "Difei Gu",
    "interest": "Explainable Medical",
    "profileImage": "/images/members/Difei_Gu.jpg",
    "id": 9,
    "personalPageUrl": "https://scholar.google.com/citations?user=nKuyKx0AAAAJ&hl=en",
    "enrollYear": 2023,
    "position": "PhD Students"
  },
  {
    "name": "Mingyu Zhao",
    "interest": "ASL",
    "profileImage": "/images/members/Mingyu_Zhao.jpg",
    "id": 10,
    "personalPageUrl": "https://scholar.google.com/citations?user=z9_Niy8AAAAJ&hl=en",
    "enrollYear": 2024,
    "position": "PhD Students"
  },
  {
    "name": "Guoning Zhang",
    "interest": "Explainable Medical",
    "profileImage": "/images/members/Difei_Gu.jpg",
    "id": 11,
    "personalPageUrl": "https://scholar.google.com/citations?user=yZkan2cAAAAJ",
    "enrollYear": 2025,
    "position": "PhD Students"
  },
  {
    "name": "Tunyu Zhang",
    "interest": "LLM Diffusion, Efficiency",
    "profileImage": "/images/members/Difei_Gu.jpg",
    "id": 12,
    "personalPageUrl": "https://scholar.google.com/citations?user=y3st15YAAAAJ&hl=en",
    "enrollYear": 2025,
    "position": "PhD Students"
  },
  {
    "name": "Gerasimos Chatzoudis",
    "interest": "Explainable AI",
    "profileImage": "/images/members/Difei_Gu.jpg",
    "id": 13,
    "personalPageUrl": "https://scholar.google.com/citations?user=9Lsgha0AAAAJ&hl=en",
    "enrollYear": 2022,
    "position": "PhD Students"
  },
  {
    "name": "Bingyu Xin",
    "interest": "Medical Image",
    "profileImage": "/images/members/Difei_Gu.jpg",
    "id": 14,
    "personalPageUrl": "https://scholar.google.com/citations?user=ENG4A1gAAAAJ&hl=en",
    "enrollYear": 2020,
    "position": "PhD Students"
  },
  {
    "name": "Bangwei Guo",
    "interest": "Medical, MRI, Cardiac Imaging",
    "profileImage": "/images/members/Difei_Gu.jpg",
    "id": 15,
    "personalPageUrl": "https://scholar.google.com/citations?user=GBbfGuUAAAAJ&hl=en",
    "enrollYear": 2022,
    "position": "PhD Students"
  },
  {
    "name": "Ruosong Ye",
    "interest": "Multi-LLM Collaboration, RL, Graph",
    "profileImage": "/images/members/Difei_Gu.jpg",
    "id": 16,
    "personalPageUrl": "https://scholar.google.com/citations?user=9Xduz3AAAAAJ&hl=en",
    "enrollYear": 2022,
    "position": "PhD Students"
  }
];

// Helper function to group people by position
export const groupPeopleByPosition = (people: Person[]) => {
  const positionOrder: Person['position'][] = [
    'Faculty',
    // 'Postdoctoral Research Associate',
    'PhD Students',
    // 'MS/PhD Students',
    'MS Students',
    'Alumni'
  ];

  const grouped = people.reduce((acc, person) => {
    if (!acc[person.position]) {
      acc[person.position] = [];
    }
    acc[person.position].push(person);
    return acc;
  }, {} as Record<Person['position'], Person[]>);

  // Sort each group by enroll year (earliest first, except Alumni which should be latest first)
  Object.keys(grouped).forEach(position => {
    if (position === 'Alumni') {
      grouped[position as Person['position']].sort((a, b) => b.enrollYear - a.enrollYear);
    } else {
      grouped[position as Person['position']].sort((a, b) => a.enrollYear - b.enrollYear);
    }
  });

  return positionOrder.map(position => ({
    position,
    people: grouped[position] || []
  })).filter(group => group.people.length > 0);
};
