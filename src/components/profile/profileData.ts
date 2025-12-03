export interface ProfileData {
  name: string;
  role: string;
  avatar: string;
  email: string;
  address: string;
  country: string;
  phone: string;
  paymentMethod: string;
}

export interface Reward {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  status: 'claimed' | 'pending';
  image: string;
}

export interface Certificate {
  id: string;
  title: string;
  level: string;
  instructor: string;
  duration: string;
  image: string;
  instructorAvatar: string;
}

export const profileData: ProfileData = {
  name: 'John Carl',
  role: 'Graphic Designer',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=165&h=165&fit=crop&crop=face',
  email: 'johncarl@email.com',
  address: '4517 Washington Ave. Manchester, Kentucky 39495',
  country: 'Singapore',
  phone: '(201) 555-0124',
  paymentMethod: 'John Carl'
};

export const rewardsData: Reward[] = [
  {
    id: '1',
    title: 'Logo Redesign Challenge',
    subtitle: '1st winner',
    amount: '$200',
    status: 'claimed',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=64&h=64&fit=crop&crop=center'
  },
  {
    id: '2',
    title: 'UI/UX Design Contest',
    subtitle: '2nd winner',
    amount: '$150',
    status: 'claimed',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=64&h=64&fit=crop&crop=center'
  },
  {
    id: '3',
    title: 'Branding Challenge',
    subtitle: '1st winner',
    amount: '$300',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=64&h=64&fit=crop&crop=center'
  },
  {
    id: '4',
    title: 'Web Design Sprint',
    subtitle: '3rd winner',
    amount: '$100',
    status: 'claimed',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=64&h=64&fit=crop&crop=center'
  },
  {
    id: '5',
    title: 'Mobile App Design',
    subtitle: '1st winner',
    amount: '$250',
    status: 'pending',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=64&h=64&fit=crop&crop=center'
  }
];

export const certificatesData: Certificate[] = [
  {
    id: '1',
    title: 'Graphic Design Fundamentals',
    level: 'Beginner',
    instructor: 'John Smith',
    duration: '48 min',
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=264&h=200&fit=crop&crop=center',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=16&h=16&fit=crop&crop=face'
  },
  {
    id: '2',
    title: 'Advanced Typography',
    level: 'Intermediate',
    instructor: 'Sarah Johnson',
    duration: '72 min',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=264&h=200&fit=crop&crop=center',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=16&h=16&fit=crop&crop=face'
  },
  {
    id: '3',
    title: 'Color Theory Mastery',
    level: 'Advanced',
    instructor: 'Mike Davis',
    duration: '95 min',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=264&h=200&fit=crop&crop=center',
    instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=16&h=16&fit=crop&crop=face'
  },
  {
    id: '4',
    title: 'UI/UX Design Principles',
    level: 'Intermediate',
    instructor: 'Emma Wilson',
    duration: '120 min',
    image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=264&h=200&fit=crop&crop=center',
    instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=16&h=16&fit=crop&crop=face'
  },
  {
    id: '5',
    title: 'Brand Identity Design',
    level: 'Advanced',
    instructor: 'Alex Chen',
    duration: '85 min',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=264&h=200&fit=crop&crop=center',
    instructorAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=16&h=16&fit=crop&crop=face'
  }
];
