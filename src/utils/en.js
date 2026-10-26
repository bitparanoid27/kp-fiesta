const headerContent = {
  headerData: [
    { pathLink: "/", pathName: "Work" },
    { pathLink: "/about", pathName: "About Me" },
    { pathLink: "/articles", pathName: "Articles" },
  ],
};

const heroContent = {
  eyebrow: {lead:"Hi I'm ", name:"Sourabh Gaikwad"},
  title: "A Product Manager from the East.",
  heroDesc: "I enjoy reading books, going to the ocean, and cooking things that occasionally work out. Mostly, I'm passionately curious. I build products, write code, and tinker with things.",
  heroDesc2: " Below are some of my side projects. I've personally built this website not some AI BS. ",
  heroDesc2Span: "It cost me hypothetical blood but real sweat and tears, I tell you.",
  projectDesc: "View Projects ↓",
  projectLink: "/#work",
  imageDesc: 'Fascinated by the Ocean.'
}

const projectContent = {
  title: "Projects",
  projectData : [
    { 
      logoKey: "db-engine", 
      projectLabel: "Binary File Store: Append only database", 
      projectLink: "https://github.com/bitparanoid27/sturdy-dbengine-proj"
    },
    {  
      logoKey: "db-stock", 
      projectLabel: "Stream Processing Workbench: should I stream or readFile?", 
      projectLink: "https://github.com/bitparanoid27/super-doodle"},
    // {  
    //   logoKey: "db-nli", 
    //   projectLabel: "NLI Claim verifier", 
    //   projectLink: "#"},
  ]
}


const footerContent = {
  quoteHeader : "Current Inspiration",
  quote: "There’s a fine line between fishing and standing on the shore looking like an idiot.",
  quoteAuthor: "Steven Wright",
  workLabel : "More work",
  workArray : [ 
    { pathName: "Github →", pathLink: "https://github.com/bitparanoid27/"},  
  ],
  contactLabel : "Contact", 
  contactArray : [ 
    { pathName : "Email →", pathItem: "mailto:sourabhgaikwad2026@gmail.com"}, 
    { pathName : "LinkedIn →", pathItem: "https://www.linkedin.com/in/sourabhg2003/"},
  ]
}

const articleContent = {
  articleTitle: " I write stuff, sometimes!!",
  articleSub: "( I try to write, but most of the time lazziness wins!! )",
  articles : [
    { articleLink: "/articles/nli", articleName: "I'm finally making AI projects"}, 
    { articleLink: "/articles/zettelkasten", articleName: "Zettelkasten a note taking system finally that works for me."}, 
    { articleLink: "/articles/reading", articleName: "What am I reading?"}, 
  ],
};

const aboutMeContent = {
  eyebrow: "A little bit",
  title: "about me",
  persPara1 : "I’m from the spice infused land of d'Inde or India. I taught myself to design and build websites. These days I'm, working on building AI-based projects and actively looking for work in ",
  para1High: "Paris, France.",
  persPara2 : "I hold a Masters degree in Project Management. Designing & building products is what I do for a living. But I've always gravitated towards technology, so coding became my passion in college so I kept at it 👨‍💻.",
  persPara3 : "Personally, I love idling by the ocean, reading and cooking, I don't know why but ever since my childhood, I was fascinated by a ",
  para3High: "camper van 🚐",
  persPara4 : " and hopefully, I'll get away in it as much as possible. I am most happy around the water 🏄‍♂️. Even though I can't swim. That doesn't scare me.",
  listenTitle: "🎧Listening",
  listening : [ 
    {trackLink: "https://youtu.be/2J7erJGlz4o", trackTitle: "Aron Wright - Build it better"},
    {trackLink: "https://youtu.be/BmUe3-sfr7E", trackTitle: "Prateek Kulhad - Kasoor"},
    {trackLink: "https://youtu.be/ojwOWLt5aEk", trackTitle: "Gaëtan Roussel - Je reste là"},
  ],
  readTitle: "📘Reading",
  reading : [
    {bookLink: "https://www.goodreads.com/book/show/35957157", bookTitle: "Annie Duke - Thinking in bets"},
    {bookLink: "https://www.goodreads.com/book/show/25374501", bookTitle: "Dan Olsen - The Lean Product Playbook"},
    {bookLink: "https://www.goodreads.com/book/show/944073", bookTitle: "Joe Abercrombie - The blade itself"},
  ],
  watchTitle: "📺Watching",
  watching : [
    {seriesLink: "https://www.imdb.com/title/tt0773262/", seriesTitle: "Dexter"},
    {seriesLink: "https://www.imdb.com/title/tt10530900/", seriesTitle: "Gullak"},
    {seriesLink: "https://www.imdb.com/title/tt2909912/", seriesTitle: "Silver Spoon"},
  ]
}

export { headerContent, heroContent, projectContent, footerContent, articleContent, aboutMeContent }