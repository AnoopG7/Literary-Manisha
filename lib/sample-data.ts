import { Work, Book, Award } from '@/types';

// ===== Sample Works =====
export const sampleWorks: Work[] = [
  {
    _id: '1',
    title: 'The Silence Between Words',
    slug: 'the-silence-between-words',
    content: `In the quiet spaces where words dare not tread,
I find the truest poems, left unsaid.
Between the lines of every page I write,
Lives a universe of whispered light.

The pen hovers, trembling, over white,
Caught between the darkness and the bright.
Each letter carries weight of untold years,
A symphony composed of joy and tears.

For in the silence, truth begins to bloom,
A flower pressing through the writer's gloom.
And every word I choose to set down free,
Becomes a bridge between the world and me.`,
    excerpt: 'In the quiet spaces where words dare not tread, I find the truest poems, left unsaid...',
    category: 'poem',
    tags: ['silence', 'writing', 'reflection', 'featured'],
    language: 'english',
    status: 'published',
    createdAt: '2025-12-15T10:00:00Z',
    updatedAt: '2025-12-15T10:00:00Z',
  },
  {
    _id: '2',
    title: 'शब्दों की नदी',
    slug: 'shabdon-ki-nadi',
    content: `शब्दों की नदी बहती है मेरे भीतर,
हर लहर में एक कहानी छिपी है।
कभी शांत, कभी उफनती हुई,
यह नदी मेरी आत्मा की गहराई से निकलती है।

किनारों पर बैठे हैं अनकहे ख्वाब,
पत्थरों पर लिखी हैं अधूरी बातें।
इस नदी में डूबकर जो निकलता है,
वो शब्दों का एक नया संसार लाता है।

बहने दो इस नदी को, रोको मत,
हर बूंद में एक कविता का जन्म है।
शब्दों की यह नदी अनंत है,
और इसकी हर धारा में जीवन है।`,
    excerpt: 'शब्दों की नदी बहती है मेरे भीतर, हर लहर में एक कहानी छिपी है...',
    category: 'poem',
    tags: ['शब्द', 'कविता', 'भावनाएं', 'featured'],
    language: 'hindi',
    status: 'published',
    createdAt: '2025-11-20T10:00:00Z',
    updatedAt: '2025-11-20T10:00:00Z',
  },
  {
    _id: '3',
    title: 'Letters to Tomorrow',
    slug: 'letters-to-tomorrow',
    content: `Dear Tomorrow,

I write to you from the margins of today, where the ink of experience has not yet dried. You are the blank page I both fear and cherish — an expanse of possibility that stretches beyond what my pen can reach.

I want to tell you about the stories I've gathered. About the old woman at the chai stall who spoke of partition with eyes that held entire oceans. About the child who drew poems in the dust with a stick, unaware that she was creating art.

These stories, Tomorrow, they belong to you now. I am merely the vessel that carries them from one shore to another. When you finally arrive — as you always do, dressed in the pale light of dawn — you'll find these words waiting for you. Read them slowly. Let them settle into your bones.

For stories, like seeds, need time to grow.

With hope and ink,
A Writer`,
    excerpt: 'Dear Tomorrow, I write to you from the margins of today, where the ink of experience has not yet dried...',
    category: 'essay',
    tags: ['letters', 'tomorrow', 'hope', 'reflection'],
    language: 'english',
    status: 'published',
    createdAt: '2025-10-05T10:00:00Z',
    updatedAt: '2025-10-05T10:00:00Z',
  },
  {
    _id: '4',
    title: 'The Weaver\'s Daughter',
    slug: 'the-weavers-daughter',
    content: `She learned to weave stories before she learned to weave cloth. Her mother's loom would sing its rhythmic song — thak-thak, thak-thak — and between each beat, little Meera would slip a word, then a sentence, then entire worlds.

"Tell me about the thread," her mother would say, fingers dancing across the warp.

"This one is blue like Nani's eyes when she remembers Abba," Meera would reply. "And this red one — it's the color of the jalebis at the mela."

Her mother would smile — that knowing smile of women who understand that cloth and stories are made the same way: one thread, one word at a time.

Years later, when Meera sat at her desk with a pen instead of a shuttle, she still heard the loom. Thak-thak. Thak-thak. Each word placed with the precision of a weaver's hand, each paragraph a pattern emerging from the chaos of loose threads.

She was her mother's daughter, after all. She wove.`,
    excerpt: 'She learned to weave stories before she learned to weave cloth...',
    category: 'story',
    tags: ['family', 'weaving', 'tradition', 'women', 'featured'],
    language: 'english',
    status: 'published',
    createdAt: '2025-09-18T10:00:00Z',
    updatedAt: '2025-09-18T10:00:00Z',
  },
  {
    _id: '5',
    title: 'चाँदनी रात',
    slug: 'chandani-raat',
    content: `चाँदनी रात में खड़ी हूँ अकेली,
चाँद की रोशनी में ढूँढती हूँ अपनी परछाई।
हवा में बिखरी हैं यादों की खुशबू,
और तारों ने सजाई है आसमान की चादर नई।

कहते हैं रात गहरी होती है सोने के लिए,
पर मेरी रातें जागती हैं सपने बुनने के लिए।
हर तारे में छिपी है एक कहानी अनकही,
और चाँद सुनाता है दास्तान पुरानी।

इस चाँदनी में डूबकर मैंने पाया,
कि अँधेरा भी रोशनी का एक रूप है।
जो देखना जानता है आँखें बंद करके,
उसके लिए हर रात एक खूबसूरत धूप है।`,
    excerpt: 'चाँदनी रात में खड़ी हूँ अकेली, चाँद की रोशनी में ढूँढती हूँ अपनी परछाई...',
    category: 'poem',
    tags: ['चाँदनी', 'रात', 'सपने', 'प्रकृति'],
    language: 'hindi',
    status: 'published',
    createdAt: '2025-08-25T10:00:00Z',
    updatedAt: '2025-08-25T10:00:00Z',
  },
  {
    _id: '6',
    title: 'Echoes of Rain',
    slug: 'echoes-of-rain',
    content: `The first drop fell on the tin roof
like a memory knocking at my door.
Then came the others — a chorus,
a hundred tiny drummers
playing the rhythm of return.

I pressed my face against the glass
and watched the world dissolve
into silver streams and gray.
The garden drank gratefully,
each leaf a cup held up in prayer.

Rain remembers everything:
the drought, the dust, the waiting.
It comes back always,
faithful as a story
that insists on being told.`,
    excerpt: 'The first drop fell on the tin roof like a memory knocking at my door...',
    category: 'poem',
    tags: ['rain', 'memory', 'nature', 'seasons'],
    language: 'english',
    status: 'published',
    createdAt: '2025-07-10T10:00:00Z',
    updatedAt: '2025-07-10T10:00:00Z',
  },
];

// ===== Sample Books =====
export const sampleBooks: Book[] = [
  {
    _id: '1',
    title: 'Whispers of the Soul',
    slug: 'whispers-of-the-soul',
    description:
      'A collection of poems that traverse the landscapes of love, loss, and longing. Written in English, these verses capture the quiet moments that define our humanity.',
    coverImage: '/images/book-1.jpg',
    amazonLink: 'https://www.amazon.in',
    genre: 'Poetry',
    publicationYear: 2024,
    language: 'english',
    featured: true,
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    _id: '2',
    title: 'अनकही बातें',
    slug: 'ankahi-baatein',
    description:
      'हिंदी कविताओं का एक संग्रह जो उन भावनाओं को शब्द देता है जो अक्सर अनकही रह जाती हैं। प्रेम, विरह, और उम्मीद की दास्तान।',
    coverImage: '/images/book-2.jpg',
    amazonLink: 'https://www.amazon.in',
    genre: 'कविता संग्रह',
    publicationYear: 2023,
    language: 'hindi',
    featured: true,
    createdAt: '2023-08-20T10:00:00Z',
  },
  {
    _id: '3',
    title: 'The Thread Between Us',
    slug: 'the-thread-between-us',
    description:
      'A collection of short stories exploring the invisible threads that connect people across time, distance, and circumstance. Stories of human connection at its most fragile and most powerful.',
    coverImage: '/images/book-3.jpg',
    amazonLink: 'https://www.amazon.in',
    genre: 'Short Stories',
    publicationYear: 2022,
    language: 'english',
    featured: false,
    createdAt: '2022-11-10T10:00:00Z',
  },
];

// ===== Sample Awards =====
export const sampleAwards: Award[] = [
  {
    _id: '1',
    title: 'Best Emerging Poet',
    issuingBody: 'National Literary Festival',
    year: 2024,
    description:
      'Awarded for outstanding contribution to contemporary poetry in both Hindi and English.',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    _id: '2',
    title: 'Hindi Sahitya Samman',
    issuingBody: 'Hindi Sahitya Akademi',
    year: 2023,
    description:
      'Recognized for exceptional work in Hindi literature and contribution to preserving the richness of Hindi storytelling.',
    createdAt: '2023-06-20T10:00:00Z',
  },
  {
    _id: '3',
    title: 'Short Story Excellence Award',
    issuingBody: 'Indian Writers\' Guild',
    year: 2022,
    description:
      'Honored for "The Weaver\'s Daughter" — a short story celebrating tradition, family, and the art of storytelling.',
    createdAt: '2022-12-01T10:00:00Z',
  },
];
