import Category from "../Category.js";
import 'dotenv/config.js'
import '../../config/database.js'


let categories = [
    {
        name: "shonen",
        detail: "Shonen manga are characterized by having a lot of action and often humorous situations with male protagonists."
    },{
        name: "comic",
        detail: "Marvel, DC and anothers comics"
    },{
        name: "shojo",
        detail: "It is aimed especially at the adolescent female audience, being mostly starring a girl."
    },{
        name: "seinen",
        detail: "Japanese seinen tells stories with a mature tone."
    }
]
﻿
Category.insertMany(categories)