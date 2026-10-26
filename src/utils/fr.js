const headerContent = {
  headerData: [
    { pathLink: "/", pathName: "Travail" },
    { pathLink: "/about", pathName: "About Me" },
    { pathLink: "/articles", pathName: "Article" },
  ],
};

const heroContent = {
  eyebrow: {lead:"Hi I'm ", name:"Sourabh Gaikwad"},
  title: "A perfectly reasonable person who willingly supports Manchester United.",
  heroDesc: "Into science, books, the sea, and cooking things that occasionally work out. Mostly just passionately curious. I build products, write code, and tinker with things.",
  heroDesc2: " Below are some of my side projects. I've personally created this website not some AI BS. ",
  heroDesc2Span: "It cost me hypothetical blood but real sweat and tears, I tell you.",
  projectDesc: "View Projects &#x2193",
  projectLink: "/fr/#work",
  imageDesc: "Water is my playground. Read more &#2192",
}
const projectContent = {
  title: "Projects",
  projectData : [
    { 
      logoKey: "db-engine", 
      projectLabel: "Binary File Store", 
      projectLink: "https://github.com/bitparanoid27/sturdy-dbengine-proj"
    },
    {  
      logoKey: "db-stock", 
      projectLabel: "Screener", 
      projectLink: "https://github.com/bitparanoid27/stock-manthan"},
    // {  
    //   logoKey: "db-nli", 
    //   projectLabel: "NLI claim verifier", 
    //   projectLink: "#"},
  ]
}

const footerContent = {
  quoteHeader : "Current Inspiration",
  quote: "There’s a fine line between fishing and standing on the shore looking like an idiot",
  quoteAuthor: "Stevan Wright",
  workLabel : "More work",
  workArray : [ 
    { pathName: "Github →", pathLink: "https://github.com/bitparanoid27/"},  
  ],
  contactLabel : "Contact", 
  contactArray : [ 
    { pathName : "Email →", pathItem: "sourabhgaikwad2026@gmail.com"}, 
    { pathName : "LinkedIn →", pathItem: "https://www.linkedin.com/in/sourabhg2003/"},
  ]
}

const articleContent = {
  articleTitle: " I write stuff sometimes ",
  articleSub: "(I try to write stuff, but most of the times lazziness wins!!)",
  articles : [
     { articleLink: "/articles/nli", articleName: "I'm finally making AI projects"}, 
    { articleLink: "/articles/zettelkasten", articleName: "Zettelkasten a note taking system finally that works for me."}, 
    { articleLink: "/articles/reading", articleName: "What am I reading?"}, 
  ],
};

const aboutMeContent = {
  eyebrow: "A little bit",
  title: "about me",
  persPara1 : "I’m from the wild West of Ireland. On a magical rock called Inishbofin Island, I taught myself to design and build websites. These days I live in Galway City and work remotely with the very talented team at ",
  para1High: "Stora",
  persPara2 : "I hold an honours degree in Mathematics and Music Technology. I previously studied Electronic Engineering and Astrophysics. Designing & building websites became my passion in college so I kept at it 👨‍💻.",
  persPara3 : "Personally, I love surfing, skating and playing music, I am obsessed with my ",
  para3High: "camper van 🚐",
  persPara4 : " and I try to get away in it as much as possible. I am most happy in the water 🏄‍♂️.",
  listenTitle: "🎧Listening",
  listening : [ 
    {trackLink: "", trackTitle: ""},
    {trackLink: "", trackTitle: ""},
    {trackLink: "", trackTitle: ""},
  ],
  readTitle: "📘Reading",
  reading : [
    {bookLink: "", bookTitle: ""},
    {bookLink: "", bookTitle: ""},
    {bookLink: "", bookTitle: ""},
  ],
  watchTitle: "📺Watching",
  watching : [
    {seriesLink: "", seriesTitle: ""},
    {seriesLink: "", seriesTitle: ""},
    {seriesLink: "", seriesTitle: ""},
  ]
}

export { headerContent, heroContent, projectContent, footerContent, articleContent, aboutMeContent }