const dummyData = [
    {
        name: "Attack on Titan",
        image: "https://thecomicbookstore.in/storage/2022/09/TCBS2491.jpg",
        year: "2013",
        country: "Japan",
        genre: "Action, Military, Mystery",
        noOfEpisodes: "25",
        trailerVideo: "Trailer URL",
        views: "2424",
        bannerImage: "https://i.ebayimg.com/images/g/K6kAAOSwCNBiCNWO/s-l1600.jpg"
    },
    {
        name: "Death Note",
        image: "https://m.media-amazon.com/images/I/71P0hdGyxcL._AC_SL1500_.jpg",
        year: "2006",
        country: "Japan",
        genre: "Action, Thriller, Martial Arts, Adventure",
        noOfEpisodes: "37",
        trailerVideo: "Trailer URL",
        views: "2342",
        bannerImage: "https://i0.wp.com/www.lindseyh.be/wp-content/uploads/2017/03/Death-Note.jpg?resize=620%2C300"
    },
    {
        name: "Kimetsu No Yaiba",
        image: "https://images-cdn.ubuy.co.in/634e6923e5e33c14ed047914-demon-slayer-kimetsu-no-yaiba-anime.jpg",
        year: "2006",
        country: "Japan",
        genre: "Mystery, Police, Psychological",
        noOfEpisodes: "37",
        trailerVideo: "Trailer URL",
        views: "3356",
        bannerImage: "https://e1.pxfuel.com/desktop-wallpaper/503/799/desktop-wallpaper-demon-slayer-kimetsu-no-yaiba-series-demon-slayer-banner.jpg"
    },
    {
        name: "Fullmetal Alchemist: Brotherhood",
        image: "https://i.ebayimg.com/images/g/2BAAAOSwOMRgdEcE/s-l1600.jpg",
        year: "2009",
        country: "Japan",
        genre: "Action, Military, Adventure",
        noOfEpisodes: "64",
        trailerVideo: "Trailer URL",
        views: "3455",
        bannerImage: "https://myhotposters.com/cdn/shop/products/mR0183_1024x1024.jpeg?v=1571444171"
    },
    {
        name: "Steins: Gate",
        image: "https://i.redd.it/fs4zyj4ogcm91.jpg",
        year: "2011",
        country: "Japan",
        genre: "Sci-Fi, Thriller",
        noOfEpisodes: "24",
        trailerVideo: "Trailer URL",
        views: "3645",
        bannerImage: "https://wallpapers.com/images/featured/steins-gate-eyml4k816uled9bw.jpg"
    },
    {
        name: "Gintama°",
        image: "https://i.ebayimg.com/images/g/6DEAAOSw7Mxi4ula/s-l1200.webp",
        year: "2015",
        country: "Japan",
        genre: "Action, Comedy, Historical",
        noOfEpisodes: "51",
        trailerVideo: "Trailer URL",
        views: "6342",
        bannerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG-38x2bpnSf6UShGxF9mai28aMCZA_03a4ue2OPKXQg&s"
    },
    {
        name: "Hunter x Hunter (2011)",
        image: "https://m.media-amazon.com/images/M/MV5BODEzNjlkMDEtMDViNS00MWE5LWI0YjMtZDRiNjhjNWQ4ZDNlXkEyXkFqcGdeQXVyMjQ3NTQ4MjQ@._V1_FMjpg_UX1000_.jpg",
        year: "2011",
        country: "Japan",
        genre: "Action, Adventure, Fantasy",
        noOfEpisodes: "148",
        trailerVideo: "Trailer URL",
        views: "2353",
        bannerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9ULq5IZ_IceVlWmHDF6LWY-Q1bblb_D0lssQvhJhtQ&s"
    },
    {
        name: "Bleach: Sennen Kessen-hen",
        image: "https://i.ebayimg.com/images/g/cNwAAOSwXVpkF-so/s-l1200.webp",
        year: "2022",
        country: "Japan",
        genre: "Action, Supernatural",
        noOfEpisodes: "13",
        trailerVideo: "Trailer URL",
        views: "2523",
        bannerImage: "https://external-preview.redd.it/bleach-thousand-year-blood-war-episode-18-discussion-thread-v0-n53DqlQ5Xb7ugN_lV99JZLn0Lsq_jrSjRJujI2S25Mc.jpg?auto=webp&s=7a05d57bbd33687244d588f2c763f5e9f97da1f3"
    },
    {
        name: "Ginga Eiyuu Densetsu",
        image: "https://cdn.myanimelist.net/images/anime/1104/91793l.jpg",
        year: "1988",
        country: "Japan",
        genre: "Drama, Military, Sci-Fi",
        noOfEpisodes: "110",
        trailerVideo: "Trailer URL",
        views: "2352",
        bannerImage: "https://c4.wallpaperflare.com/wallpaper/245/499/803/ginga-eiyuu-densetsu-von-reuenthal-oskar-mittermeyer-wolfgang-anime-wallpaper-preview.jpg"
    },
    {
        name: "Kaguya-sama wa Kokurasetai: Ultra Romantic",
        image: "https://pbs.twimg.com/media/FOGgzzNWYAI-VbM.jpg:large",
        year: "2022",
        country: "Japan",
        genre: "Comedy, Psychological, Romance",
        noOfEpisodes: "13",
        trailerVideo: "Trailer URL",
        views: "2342",
        bannerImage: "https://s1.zerochan.net/Kaguya-sama.wa.Kokurasetai%3A.Ultra.Romantic.600.3596676.jpg"
    },
    {
        name: "Fruits Basket: The Final",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjIQyUwRt3fhlOBaiL17he8vM4YWASrmoc5M62U5e2Tw&s",
        year: "2021",
        country: "Japan",
        genre: "Drama, Romance, Supernatural",
        noOfEpisodes: "13",
        trailerVideo: "Trailer URL",
        views: "2352",
        bannerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6sFGgNWbA9hw_1n665KJVD5i3RhgT3at9MdHUIxieWQ&s"
    },
    {
        name: "Clannad: After Story",
        image: "https://i.pinimg.com/474x/81/7b/3a/817b3a08d8e4c7282e3c1f567836059d.jpg",
        year: "2008",
        country: "Japan",
        genre: "Drama, Romance, Slice of Life",
        noOfEpisodes: "24",
        trailerVideo: "Trailer URL",
        views: "3242",
        bannerImage: "https://i.pinimg.com/originals/91/bb/89/91bb89a1badce14c3e6e0705b1746933.jpg"
    },
    {
        name: "Koe no Katachi",
        image: "https://c8.alamy.com/comp/KF5MNA/a-silent-voice-aka-koe-no-katachi-us-poster-2016-eleven-arts-courtesy-KF5MNA.jpg",
        year: "2016",
        country: "Japan",
        genre: "Drama, School, Shounen",
        noOfEpisodes: "1",
        trailerVideo: "Trailer URL",
        views: "6323",
        bannerImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4rtungZENyBsUP9PuCc3uNdKWBFfLHhCjcHvjAQUGAQ&s"
    },
    {
        name: "3-gatsu no Lion 2nd Season",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0fN0kaR_gx3auCL9mn2xvMI487O8GAFgq1_LRpnuHCA&s",
        year: "2017",
        country: "Japan",
        genre: "Drama, Game, Slice of Life",
        noOfEpisodes: "22",
        trailerVideo: "Trailer URL",
        views: "2425",
        bannerImage: "https://miro.medium.com/v2/resize:fit:1080/1*ZqKs4HVIDNUYd6WXPzcmEA.jpeg"
    },
]

export default dummyData