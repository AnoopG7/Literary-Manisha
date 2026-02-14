import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Work from '@/lib/models/Work';
import Book from '@/lib/models/Book';
import Award from '@/lib/models/Award';

export async function POST() {
  try {
    const db = await dbConnect();
    if (!db) {
      return NextResponse.json({ error: 'Database not connected' }, { status: 503 });
    }

    // Clear existing data
    await Promise.all([
      Work.deleteMany({}),
      Book.deleteMany({}),
      Award.deleteMany({}),
    ]);

    // =============================================
    // BOOKS — Manisha Keshav's Published Books
    // =============================================
    const books = await Book.create([
      {
        title: 'समझ सको तो अर्थ हूँ, ना समझो तो व्यर्थ हूँ',
        description: 'Manisha Keshav की पहली काव्य संग्रह। इस पुस्तक को 21st Century Emily Dickinson Award के लिए नामांकित किया गया। शब्दों के माध्यम से जीवन के अर्थ और व्यर्थ की गहन खोज।',
        amazonLink: 'https://www.amazon.in/dp/9363303624',
        genre: 'Poetry',
        publicationYear: 2023,
        language: 'hindi',
        featured: true,
      },
      {
        title: 'ये मेरी और मेरे मालिक की अंतरंग गफ़्तगू है',
        description: 'Emily Dickinson Award विजेता काव्य संग्रह। ईश्वर और आत्मा के बीच की अंतरंग बातचीत, आध्यात्मिकता और कविता का अद्भुत संगम।',
        amazonLink: 'https://www.amazon.in/dp/9367390793',
        genre: 'Poetry',
        publicationYear: 2023,
        language: 'hindi',
        featured: true,
      },
      {
        title: 'अब तू अंधकार का आभार व्यक्त कर',
        description: 'Emily Dickinson Award विजेता। अंधकार से प्रकाश की ओर की यात्रा — दर्द को कृतज्ञता में बदलने की कला। ISBN: 9789369546862',
        amazonLink: 'https://www.amazon.in/Manisha-keshav/dp/9369546863',
        genre: 'Poetry',
        publicationYear: 2024,
        language: 'hindi',
        featured: true,
      },
      {
        title: 'फिर तुम्हारी हर एक बात में दम है',
        description: 'Emily Dickinson Award विजेता। प्रेम, विश्वास और शब्दों की शक्ति पर एक मार्मिक काव्य संग्रह। ISBN: 9789371564298',
        amazonLink: 'https://www.amazon.in/Manisha-Keshav/dp/9371564296',
        genre: 'Poetry',
        publicationYear: 2024,
        language: 'hindi',
        featured: false,
      },
      {
        title: 'तू अभी भी लाजवाब है',
        description: 'Emily Dickinson Award विजेता। जीवन के सुंदर क्षणों और अनकही भावनाओं को शब्दों में पिरोती कविताओं का संग्रह। ISBN: 9789369540167',
        amazonLink: 'https://www.amazon.in/dp/9369540164',
        genre: 'Poetry',
        publicationYear: 2024,
        language: 'hindi',
        featured: false,
      },
      {
        title: 'में किसे त्याग कर दूँ?',
        description: 'Emily Dickinson Award विजेता। त्याग, समर्पण और आत्म-खोज की कविताएँ। जीवन के कठिन प्रश्नों से मुठभेड़। ISBN: 9798898655273',
        amazonLink: 'https://www.amazon.in/Main-kise-tyaag-kar-yourself/dp/B0FZLD5H3Y',
        genre: 'Poetry',
        publicationYear: 2024,
        language: 'hindi',
        featured: false,
      },
      {
        title: 'स्वीकार किया',
        description: 'Emily Dickinson Award विजेता। स्वीकृति की शक्ति — जीवन की हर परिस्थिति को गले लगाने का संदेश देती कविताएँ। ISBN: 9798900812441',
        amazonLink: 'https://www.amazon.in/dp/B0G2RQN8T1',
        genre: 'Poetry',
        publicationYear: 2025,
        language: 'hindi',
        featured: true,
      },
      {
        title: 'शब्द स्पर्श',
        description: 'Emily Dickinson Award विजेता। शब्दों का स्पर्श — जो शब्द स्वयं सिद्ध हैं। कविता की अनुभूति और भाव का गहरा संग्रह। ISBN: 9789373147710',
        amazonLink: 'https://www.amazon.in/Shabd-Sparsh-svaym-sidh-hain/dp/9373147714',
        genre: 'Poetry',
        publicationYear: 2025,
        language: 'hindi',
        featured: true,
      },
      {
        title: 'जिंदगी एक रोमांच है',
        description: 'इन रोमांच से रोमांस लाजमी है। जिंदगी के उतार-चढ़ाव को रोमांच की तरह जीने की प्रेरणा देती कविताएँ।',
        amazonLink: 'https://www.amazon.in/s?k=manisha+keshav',
        genre: 'Poetry',
        publicationYear: 2025,
        language: 'hindi',
        featured: false,
      },
      {
        title: 'में मुक्त हूँ',
        description: 'खुद ही खुद के मुक्तिदाता बनो। आत्म-मुक्ति और स्वतंत्रता की कविताओं का संग्रह जो पाठक को अपनी ताकत पहचानने के लिए प्रेरित करता है।',
        amazonLink: 'https://www.amazon.in/s?k=manisha+keshav',
        genre: 'Poetry',
        publicationYear: 2025,
        language: 'hindi',
        featured: false,
      },
      {
        title: 'The Serpent\'s Embrace',
        description: 'A mythological thriller and science fiction series now live on Kindle. A gripping narrative that weaves ancient myths with futuristic science, creating an unforgettable reading experience.',
        amazonLink: 'https://www.amazon.in/s?k=manisha+keshav+serpents+embrace',
        genre: 'Mythological Thriller & Science Fiction',
        publicationYear: 2025,
        language: 'english',
        featured: true,
      },
    ]);

    // =============================================
    // AWARDS — Consolidated
    // =============================================
    const awards = await Award.create([
      {
        title: '7 Time Emily Dickinson Award Winner',
        issuingBody: 'Bookleaf Publishing',
        year: 2025,
        description: 'Honored seven times with the prestigious Emily Dickinson Award for outstanding contributions to poetry. The judges praised her for "her poetic humility, her spiritual depth, and her ability to turn pain into praise." Award-winning books: ये मेरी और मेरे मालिक की अंतरंग गफ़्तगू है, अब तू अंधकार का आभार व्यक्त कर, फिर तुम्हारी हर एक बात में दम है, तू अभी भी लाजवाब है, में किसे त्याग कर दूँ?, स्वीकार किया, and शब्द स्पर्श।',
      },
      {
        title: '21st Century Emily Dickinson Award — Nomination',
        issuingBody: 'Bookleaf Publishing',
        year: 2023,
        description: 'Nominated for the prestigious 21st Century Emily Dickinson Award for "समझ सको तो अर्थ हूँ, ना समझो तो व्यर्थ हूँ" — recognizing exceptional poetic talent.',
      },
      {
        title: 'Featured in The Writer Magazine',
        issuingBody: 'The Writer Magazine',
        year: 2024,
        description: 'Recognition for outstanding literary achievements and contributions to contemporary Hindi and English poetry.',
      },
    ]);

    // =============================================
    // WORKS — Using exact titles from prompt
    // =============================================
    const works = await Work.create([
      {
        title: 'समझ सको तो अर्थ हूँ, ना समझो तो व्यर्थ हूँ',
        content: `समझ सको तो अर्थ हूँ,
ना समझो तो व्यर्थ हूँ।

शब्दों के पीछे छुपा हूँ,
भावों में बसा हूँ।
जो पढ़ले दिल से मुझे,
उसकी आँखों में बसा हूँ।

ना समझो तो बस अक्षर हूँ,
समझ लो तो संसार हूँ।

— Manisha Keshav`,
        excerpt: 'शब्दों के पीछे छुपे अर्थ और भावनाओं की गहन अभिव्यक्ति।',
        category: 'poem',
        tags: ['आत्मचिंतन', 'अर्थ', 'जीवन', 'featured'],
        language: 'hindi',
        status: 'published',
        createdAt: new Date('2023-06-15'),
        updatedAt: new Date('2023-06-15'),
      },
      {
        title: 'ये मेरी और मेरे मालिक की अंतरंग गफ़्तगू है',
        content: `ये मेरी और मेरे मालिक की अंतरंग गफ़्तगू है,
ईश्वर और आत्मा के बीच की बातचीत।

जब मैं चुप होती हूँ,
तब वो बोलते हैं।
जब मैं रोती हूँ,
तब वो मुस्कुराते हैं।

ये गफ़्तगू शब्दों से परे है,
ये दिल और रूह की बात है।

— Manisha Keshav`,
        excerpt: 'ईश्वर और आत्मा के बीच की अंतरंग बातचीत — आध्यात्मिकता और कविता का संगम।',
        category: 'poem',
        tags: ['आध्यात्मिक', 'ईश्वर', 'आत्मा', 'featured'],
        language: 'hindi',
        status: 'published',
        createdAt: new Date('2023-09-10'),
        updatedAt: new Date('2023-09-10'),
      },
      {
        title: 'अब तू अंधकार का आभार व्यक्त कर',
        content: `अब तू अंधकार का आभार व्यक्त कर,
क्योंकि उसी ने तुझे प्रकाश की कीमत सिखाई।

रात के गर्भ से ही तो,
सुबह ने जन्म लिया।
आँसुओं की नदी से ही तो,
मुस्कान ने किनारा पाया।

अंधेरा तेरा दुश्मन नहीं,
वो तेरा गुरु है।

— Manisha Keshav`,
        excerpt: 'अंधकार से प्रकाश की ओर — दर्द को कृतज्ञता में बदलने की कला।',
        category: 'poem',
        tags: ['अंधकार', 'प्रकाश', 'आध्यात्मिक', 'featured'],
        language: 'hindi',
        status: 'published',
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20'),
      },
      {
        title: 'फिर तुम्हारी हर एक बात में दम है',
        content: `फिर तुम्हारी हर एक बात में दम है,
तुम्हारे शब्दों में जादू है।

हर बात में सच्चाई,
हर शब्द में गहराई।
तुम बोलो तो दुनिया सुने,
तुम लिखो तो दिल भर जाए।

— Manisha Keshav`,
        excerpt: 'प्रेम, विश्वास और शब्दों की शक्ति पर मार्मिक कविता।',
        category: 'poem',
        tags: ['प्रेम', 'विश्वास', 'शब्द'],
        language: 'hindi',
        status: 'published',
        createdAt: new Date('2024-03-15'),
        updatedAt: new Date('2024-03-15'),
      },
      {
        title: 'तू अभी भी लाजवाब है',
        content: `तू अभी भी लाजवाब है,
समय ने तुझे और निखारा है।

जिंदगी की हर चोट ने,
तुझे और मजबूत बनाया।
हर आँसू ने तेरी आँखों में,
और गहराई लाया।

तू अभी भी लाजवाब है —
और हमेशा रहेगा।

— Manisha Keshav`,
        excerpt: 'जीवन के सुंदर क्षणों और अनकही भावनाओं की कविता।',
        category: 'poem',
        tags: ['जीवन', 'सौंदर्य', 'भावनाएँ'],
        language: 'hindi',
        status: 'published',
        createdAt: new Date('2024-05-10'),
        updatedAt: new Date('2024-05-10'),
      },
      {
        title: 'में किसे त्याग कर दूँ?',
        content: `में किसे त्याग कर दूँ?
हर रिश्ता मेरा अपना है,
हर दर्द मेरा साथी है।

त्याग में शक्ति है,
पर प्रेम में भी तो शक्ति है।
किसे चुनूँ, किसे छोड़ूँ,
ये सवाल ही मेरी कविता है।

— Manisha Keshav`,
        excerpt: 'त्याग, समर्पण और आत्म-खोज की कविता।',
        category: 'poem',
        tags: ['त्याग', 'समर्पण', 'आत्म-खोज'],
        language: 'hindi',
        status: 'published',
        createdAt: new Date('2024-07-20'),
        updatedAt: new Date('2024-07-20'),
      },
      {
        title: 'स्वीकार किया',
        content: `स्वीकार किया मैंने,
हर उस दर्द को जो जीवन ने दिया।
हर उस राह को जो कठिन थी,
हर उस रात को जो अंतहीन थी।

स्वीकार में शक्ति है,
हार में नहीं।
जो स्वीकार कर ले जीवन को,
वो मुक्त है, बंधन में नहीं।

— Manisha Keshav`,
        excerpt: 'स्वीकृति की शक्ति — जीवन को गले लगाने का संदेश।',
        category: 'poem',
        tags: ['स्वीकार', 'शक्ति', 'मुक्ति', 'featured'],
        language: 'hindi',
        status: 'published',
        createdAt: new Date('2025-01-05'),
        updatedAt: new Date('2025-01-05'),
      },
      {
        title: 'शब्द स्पर्श',
        content: `शब्द स्वयं सिद्ध हैं,
उन्हें किसी प्रमाण की आवश्यकता नहीं।

जब शब्द स्पर्श करते हैं,
तो आत्मा काँप उठती है।
जब कविता बहती है,
तो हृदय गाने लगता है।

शब्दों का स्पर्श —
दुनिया की सबसे कोमल,
और सबसे शक्तिशाली चीज़।

— Manisha Keshav`,
        excerpt: 'शब्दों की शक्ति और उनके स्पर्श की अनुभूति — कविता की आत्मा।',
        category: 'poem',
        tags: ['शब्द', 'कविता', 'स्पर्श', 'featured'],
        language: 'hindi',
        status: 'published',
        createdAt: new Date('2025-01-10'),
        updatedAt: new Date('2025-01-10'),
      },
      {
        title: 'जिंदगी एक रोमांच है',
        content: `जिंदगी एक रोमांच है,
इन रोमांच से रोमांस लाजमी है।

हर पल एक नई कहानी,
हर मोड़ एक नया सफ़र।
जिंदगी को रोमांच की तरह जियो,
डर को पीछे छोड़ दो।

— Manisha Keshav`,
        excerpt: 'जिंदगी के रोमांच और रोमांस की कविता।',
        category: 'poem',
        tags: ['जिंदगी', 'रोमांच', 'रोमांस'],
        language: 'hindi',
        status: 'published',
        createdAt: new Date('2025-01-20'),
        updatedAt: new Date('2025-01-20'),
      },
      {
        title: 'में मुक्त हूँ',
        content: `में मुक्त हूँ,
खुद ही खुद के मुक्तिदाता बनो।

किसी और से क्या माँगना,
जब ताकत तुम्हारे भीतर है।
किसी और से क्या उम्मीद,
जब रोशनी तुम्हारे अंदर है।

तोड़ दो वो ज़ंजीरें,
जो तुमने खुद पहनी हैं।
में मुक्त हूँ — और तुम भी हो सकते हो।

— Manisha Keshav`,
        excerpt: 'खुद ही खुद के मुक्तिदाता बनो — आत्म-मुक्ति और स्वतंत्रता की कविता।',
        category: 'poem',
        tags: ['मुक्ति', 'स्वतंत्रता', 'आत्मशक्ति'],
        language: 'hindi',
        status: 'published',
        createdAt: new Date('2025-02-01'),
        updatedAt: new Date('2025-02-01'),
      },
      {
        title: 'जब तेरा ज़िक्र होता है',
        content: `जब तेरा ज़िक्र होता है,
दिल में एक लहर सी उठती है।
आँखें नम हो जाती हैं,
और होंठों पर मुस्कान आ जाती है।

तेरा ज़िक्र — मेरी कविता है,
तेरी याद — मेरी प्रार्थना है।

प्रेम कविताओं का संग्रह,
जो दिल की गहराइयों से निकला है।

— Manisha Keshav`,
        excerpt: 'प्रेम कविताओं का संग्रह — दिल की गहराइयों से।',
        category: 'poem',
        tags: ['प्रेम', 'याद', 'कविता', 'featured'],
        language: 'hindi',
        status: 'published',
        createdAt: new Date('2024-06-15'),
        updatedAt: new Date('2024-06-15'),
      },
      // --- English Works ---
      {
        title: 'Swirl & Still',
        content: `In the swirl of identity, I find stillness.
In the chaos of nature, I find peace.
These verses are an exploration — 
of who we are, where we belong,
and the quiet moments that define us.

A critically acclaimed collection exploring themes
of identity, nature, and introspection.
Each poem is a mirror, reflecting the reader's
own journey through the labyrinth of self.

— Manisha Keshav`,
        excerpt: 'A critically acclaimed collection exploring themes of identity, nature, and introspection.',
        category: 'poem',
        tags: ['identity', 'nature', 'introspection', 'anthology', 'featured'],
        language: 'english',
        status: 'published',
        createdAt: new Date('2024-03-10'),
        updatedAt: new Date('2024-03-10'),
      },
      {
        title: 'The Escapade of Dreams',
        content: `Dreams are the landscapes of our longing,
painted in colors we cannot name while awake.

This collection is a fusion of emotions,
landscapes, and universal narratives —
resonating with readers worldwide.

From the dust of Delhi streets
to the mist of mountain mornings,
these poems carry the weight of worlds
and the lightness of letting go.

— Manisha Keshav`,
        excerpt: 'A fusion of emotions, landscapes, and universal narratives, resonating with readers worldwide.',
        category: 'poem',
        tags: ['dreams', 'emotions', 'landscapes', 'anthology', 'featured'],
        language: 'english',
        status: 'published',
        createdAt: new Date('2024-07-20'),
        updatedAt: new Date('2024-07-20'),
      },
      {
        title: 'The Serpent\'s Embrace',
        content: `When myth meets science, the boundaries of reality dissolve.

The Serpent's Embrace is a mythological thriller
intertwined with science fiction — 
where ancient legends awaken in a modern world,
and the line between god and machine blurs.

A gripping series that challenges what we know
about mythology, technology, and the human spirit.

Available on Kindle.

— Manisha Keshav`,
        excerpt: 'A mythological thriller and science fiction series — where ancient legends awaken in a modern world.',
        category: 'story',
        tags: ['mythology', 'thriller', 'science-fiction', 'kindle', 'featured'],
        language: 'english',
        status: 'published',
        createdAt: new Date('2025-01-15'),
        updatedAt: new Date('2025-01-15'),
      },
      // --- Essays ---
      {
        title: 'On Poetry and Prayer',
        content: `The judges of the Emily Dickinson Award praised her for
"her poetic humility, her spiritual depth, and her ability
to turn pain into praise."

Indeed, vulnerability is strength.
And even the broken pieces of our lives
can become sacred texts.

Poetry is not just an art — it is a conversation
between the poet and the divine,
between the word and the silence that surrounds it.

— Manisha Keshav`,
        excerpt: 'Exploring the sacred intersection of poetry and prayer — how writing becomes an act of devotion.',
        category: 'essay',
        tags: ['poetry', 'prayer', 'spirituality', 'emily-dickinson-award'],
        language: 'english',
        status: 'published',
        createdAt: new Date('2024-11-01'),
        updatedAt: new Date('2024-11-01'),
      },
      {
        title: 'Turning Pain into Praise',
        content: `Every poet carries wounds.
But the gifted ones learn to transform those wounds into words,
and those words into bridges that connect hearts.

Writing has always been my refuge.
When life delivers its harshest blows,
I reach for my pen — not to escape,
but to make sense of it all.

Pain is not the enemy.
It is the raw material from which
the most beautiful art is forged.

— Manisha Keshav`,
        excerpt: 'How wounds become words, and words become bridges that connect hearts.',
        category: 'essay',
        tags: ['writing', 'creativity', 'healing', 'featured'],
        language: 'english',
        status: 'published',
        createdAt: new Date('2024-09-15'),
        updatedAt: new Date('2024-09-15'),
      },
    ]);

    return NextResponse.json({
      success: true,
      message: 'Database seeded with real author data!',
      summary: {
        books: { total: books.length, titles: books.map(b => b.title) },
        awards: { total: awards.length, titles: awards.map(a => a.title) },
        works: { total: works.length, titles: works.map(w => w.title) },
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
