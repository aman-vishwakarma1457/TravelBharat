const baseDestinations = [
  {
    id:'taj-mahal', name:'Taj Mahal', city:'Agra', state:'Uttar Pradesh', category:'Heritage',
    description:'An iconic marble mausoleum and enduring symbol of love on the banks of the Yamuna.',
    historicalSignificance:'Commissioned by Shah Jahan in the 17th century, the Taj Mahal is celebrated for its Mughal architecture, symmetry and intricate marble inlay.',
    bestTimeToVisit:'October – March', entryFee:'₹50 (Indian visitors)', timings:'6:00 AM – 6:30 PM',
    location:'Agra, Uttar Pradesh', verified:true,
    images:[
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['uttar-pradesh-agra-fort','varanasi-ghats']
  },
  {
    id:'jaipur-city-palace', name:'Jaipur City Palace', city:'Jaipur', state:'Rajasthan', category:'Heritage',
    description:'A grand royal complex blending Rajput, Mughal and European architectural influences.',
    historicalSignificance:'The palace complex has been central to Jaipur’s royal history since the city was founded in the 18th century.',
    bestTimeToVisit:'October – March', entryFee:'₹300 onwards', timings:'9:30 AM – 5:00 PM',
    location:'Jaipur, Rajasthan', verified:true,
    images:[
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['amber-fort','udaipur-city']
  },
  {
    id:'kerala-backwaters', name:'Kerala Backwaters', city:'Alappuzha', state:'Kerala', category:'Nature',
    description:'A serene network of lagoons, canals and palm-fringed waterways best experienced by houseboat.',
    historicalSignificance:'The waterways have long supported Kerala’s trade, agriculture and distinctive village life.',
    bestTimeToVisit:'November – February', entryFee:'Varies by experience', timings:'Daylight hours',
    location:'Alappuzha, Kerala', verified:true,
    images:[
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['goa-beaches','mysore-palace']
  },
  {
    id:'goa-beaches', name:'Goa Beaches', city:'Panaji', state:'Goa', category:'Nature',
    description:'A lively coastline of golden sands, palm trees, water activities and memorable sunsets.',
    historicalSignificance:'Goa’s coast reflects centuries of maritime exchange and Portuguese cultural influence.',
    bestTimeToVisit:'November – February', entryFee:'Free', timings:'Open throughout the day',
    location:'Goa', verified:true,
    images:[
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['kerala-backwaters','hampi']
  },
  {
    id:'varanasi-ghats', name:'Varanasi Ghats', city:'Varanasi', state:'Uttar Pradesh', category:'Religious',
    description:'Historic riverside ghats along the Ganga, alive with rituals, music and evening aarti.',
    historicalSignificance:'Varanasi is one of the world’s oldest continuously inhabited cities and a major Hindu pilgrimage centre.',
    bestTimeToVisit:'October – March', entryFee:'Free', timings:'Best at sunrise and evening',
    location:'Varanasi, Uttar Pradesh', verified:true,
    images:[
      'https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['uttar-pradesh-agra-fort','rishikesh']
  },
  {
    id:'hampi', name:'Hampi', city:'Hampi', state:'Karnataka', category:'Heritage',
    description:'A spectacular landscape of boulder-strewn hills and monumental ruins from the Vijayanagara era.',
    historicalSignificance:'The ruins preserve the legacy of one of medieval South India’s most powerful empires.',
    bestTimeToVisit:'October – February', entryFee:'₹40 onwards', timings:'6:00 AM – 6:00 PM',
    location:'Hampi, Karnataka', verified:true,
    images:[
      'https://images.unsplash.com/photo-1600100397608-f010e4c1e0d0?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['mysore-palace','goa-beaches']
  },
  {
    id:'udaipur-city', name:'Udaipur', city:'Udaipur', state:'Rajasthan', category:'Heritage',
    description:'A romantic lake city known for palaces, old streets, crafts and sunset views.',
    historicalSignificance:'Founded in the 16th century, Udaipur became the historic capital of Mewar.',
    bestTimeToVisit:'October – March', entryFee:'Varies', timings:'Varies by attraction',
    location:'Udaipur, Rajasthan', verified:true,
    images:[
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['jaipur-city-palace','amber-fort']
  },
  {
    id:'rishikesh', name:'Rishikesh', city:'Rishikesh', state:'Uttarakhand', category:'Adventure',
    description:'A Himalayan gateway for rafting, yoga, riverfront walks and mountain escapes.',
    historicalSignificance:'Rishikesh has long been associated with pilgrimage, meditation and the Ganga.',
    bestTimeToVisit:'September – November, February – April', entryFee:'Varies', timings:'Varies',
    location:'Rishikesh, Uttarakhand', verified:true,
    images:[
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['varanasi-ghats','manali']
  },
  {
    id:'darjeeling', name:'Darjeeling', city:'Darjeeling', state:'West Bengal', category:'Nature',
    description:'A scenic hill town famous for tea gardens, mountain views and the Himalayan railway.',
    historicalSignificance:'Darjeeling grew as a colonial hill station and became globally known for its tea.',
    bestTimeToVisit:'March – May, October – November', entryFee:'Varies', timings:'Daylight hours',
    location:'Darjeeling, West Bengal', verified:true,
    images:[
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['kaziranga','manali']
  },
  {
    id:'kaziranga', name:'Kaziranga National Park', city:'Kohora', state:'Assam', category:'Nature',
    description:'A renowned wildlife landscape known for the greater one-horned rhinoceros and rich biodiversity.',
    historicalSignificance:'The park has become an important conservation landscape for Assam’s wildlife.',
    bestTimeToVisit:'November – April', entryFee:'Varies by safari', timings:'Safari slots',
    location:'Assam', verified:true,
    images:[
      'https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['darjeeling']
  },
  {
    id:'konark-sun-temple', name:'Konark Sun Temple', city:'Konark', state:'Odisha', category:'Heritage',
    description:'A monumental stone temple designed as the chariot of the Sun God.',
    historicalSignificance:'Built in the 13th century, the temple is celebrated for its wheel carvings and Kalinga architecture.',
    bestTimeToVisit:'October – February', entryFee:'₹40 onwards', timings:'6:00 AM – 8:00 PM',
    location:'Konark, Odisha', verified:true,
    images:[
      'https://images.unsplash.com/photo-1624303832277-2d1c5b0c5b6b?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['hampi']
  },
  {
    id:'manali', name:'Manali', city:'Manali', state:'Himachal Pradesh', category:'Adventure',
    description:'A mountain retreat with pine forests, snowy peaks, river valleys and adventure trails.',
    historicalSignificance:'Manali sits within the ancient cultural landscape of the Kullu Valley.',
    bestTimeToVisit:'October – June', entryFee:'Varies', timings:'Daylight hours',
    location:'Manali, Himachal Pradesh', verified:true,
    images:[
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=90',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85'
    ],
    nearbyAttractions:['rishikesh','darjeeling']
  },
  {
    id:'amber-fort', name:'Amber Fort', city:'Jaipur', state:'Rajasthan', category:'Heritage',
    description:'A hilltop fort-palace known for ornate courtyards, sandstone walls and panoramic views.',
    historicalSignificance:'Amber was a major seat of the Kachwaha Rajput rulers before Jaipur was established.',
    bestTimeToVisit:'October – March', entryFee:'₹100 onwards', timings:'8:00 AM – 6:00 PM',
    location:'Amer, Rajasthan', verified:true,
    images:[
      'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1600&q=90'
    ],
    nearbyAttractions:['jaipur-city-palace','udaipur-city']
  },
  {
    id:'mysore-palace', name:'Mysore Palace', city:'Mysuru', state:'Karnataka', category:'Heritage',
    description:'A dazzling royal palace celebrated for Indo-Saracenic architecture and illuminated evenings.',
    historicalSignificance:'The palace was the seat of the Wadiyar dynasty and remains central to Mysuru’s cultural identity.',
    bestTimeToVisit:'October – February', entryFee:'₹100 onwards', timings:'10:00 AM – 5:30 PM',
    location:'Mysuru, Karnataka', verified:true,
    images:[
      'https://images.unsplash.com/photo-1609766418204-94aae0ecf0c6?auto=format&fit=crop&w=1600&q=90'
    ],
    nearbyAttractions:['hampi','kerala-backwaters']
  },
  {
    id:'golden-temple', name:'Golden Temple', city:'Amritsar', state:'Punjab', category:'Religious',
    description:'A serene Sikh gurdwara surrounded by the Amrit Sarovar and known for its welcoming spirit.',
    historicalSignificance:'The complex is one of the most important centres of Sikhism and a symbol of equality and service.',
    bestTimeToVisit:'October – March', entryFee:'Free', timings:'Open daily',
    location:'Amritsar, Punjab', verified:true,
    images:[
      'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1600&q=90'
    ],
    nearbyAttractions:['varanasi-ghats']
  },
  {
    id:'meghalaya-living-roots', name:'Living Root Bridges', city:'Cherrapunji', state:'Meghalaya', category:'Nature',
    description:'Remarkable bridges shaped from living tree roots by generations of Khasi communities.',
    historicalSignificance:'The bridges represent indigenous ecological knowledge and a unique relationship with the forest.',
    bestTimeToVisit:'October – April', entryFee:'Local access fees may apply', timings:'Daylight hours',
    location:'Meghalaya', verified:true,
    images:[
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=90'
    ],
    nearbyAttractions:['darjeeling']
  },
  {
    id:'leh-ladakh', name:'Leh & Ladakh', city:'Leh', state:'Ladakh', category:'Adventure',
    description:'High-altitude landscapes, monasteries, turquoise lakes and unforgettable mountain roads.',
    historicalSignificance:'Ladakh’s monasteries and trade routes reflect centuries of Himalayan Buddhist culture.',
    bestTimeToVisit:'May – September', entryFee:'Varies', timings:'Daylight hours',
    location:'Leh, Ladakh', verified:true,
    images:[
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=90'
    ],
    nearbyAttractions:['manali']
  },
  {
    id:'munnar', name:'Munnar', city:'Munnar', state:'Kerala', category:'Nature',
    description:'Rolling tea plantations, misty hills and cool mountain air in Kerala’s Western Ghats.',
    historicalSignificance:'Munnar developed as a major tea-growing region during the colonial period.',
    bestTimeToVisit:'September – May', entryFee:'Varies', timings:'Daylight hours',
    location:'Munnar, Kerala', verified:true,
    images:[
      'https://images.unsplash.com/photo-1602305210600-8b4f8e4d1d8a?auto=format&fit=crop&w=1600&q=90'
    ],
    nearbyAttractions:['kerala-backwaters']
  }

]

const stateAttractions = {
  'Andhra Pradesh':['Araku Valley','Borra Caves','Tirupati Temple','Vijayawada Kanaka Durga Temple','Visakhapatnam Beach'],
  'Arunachal Pradesh':['Tawang Monastery','Sela Pass','Ziro Valley','Bomdila','Dirang Valley'],
  'Assam':['Kaziranga National Park','Majuli Island','Kamakhya Temple','Manas National Park','Sivasagar'],
  'Bihar':['Mahabodhi Temple','Nalanda Ruins','Rajgir','Vaishali','Vikramshila'],
  'Chhattisgarh':['Chitrakote Falls','Tirathgarh Falls','Bastar Palace','Kanger Valley National Park','Barnawapara Wildlife Sanctuary'],
  'Goa':['Basilica of Bom Jesus','Dudhsagar Falls','Fort Aguada','Palolem Beach','Fontainhas'],
  'Gujarat':['Rann of Kutch','Somnath Temple','Dwarkadhish Temple','Statue of Unity','Modhera Sun Temple'],
  'Haryana':['Kurukshetra','Sultanpur National Park','Pinjore Gardens','Morni Hills','Sheikh Chilli Tomb'],
  'Himachal Pradesh':['Rohtang Pass','Solang Valley','Spiti Valley','Kufri','Dalai Lama Temple'],
  'Jharkhand':['Hundru Falls','Dassam Falls','Deoghar Temple','Betla National Park','Netarhat'],
  'Karnataka':['Mysore Palace','Badami Caves','Coorg','Gokarna','Bandipur National Park'],
  'Kerala':['Munnar','Varkala Cliff','Kovalam Beach','Thekkady','Fort Kochi'],
  'Madhya Pradesh':['Khajuraho Temples','Sanchi Stupa','Kanha National Park','Bandhavgarh National Park','Bhimbetka'],
  'Maharashtra':['Gateway of India','Ajanta Caves','Ellora Caves','Lonavala','Mahabaleshwar'],
  'Manipur':['Loktak Lake','Kangla Fort','Shree Govindajee Temple','Keibul Lamjao National Park','Andro Village'],
  'Meghalaya':['Nohkalikai Falls','Living Root Bridges','Mawsynram','Dawki River','Elephant Falls'],
  'Mizoram':['Reiek','Durtlang Hills','Vantawng Falls','Phawngpui','Solomon Temple'],
  'Nagaland':['Kisama Heritage Village','Dzukou Valley','Kohima War Cemetery','Khonoma Village','Japfu Peak'],
  'Odisha':['Jagannath Temple','Konark Sun Temple','Chilika Lake','Udayagiri Caves','Bhitarkanika National Park'],
  'Punjab':['Golden Temple','Jallianwala Bagh','Wagah Border','Patiala Heritage','Anandpur Sahib'],
  'Rajasthan':['Amber Fort','Mehrangarh Fort','Jaisalmer Fort','Pushkar','Ranthambore National Park'],
  'Sikkim':['Tsomgo Lake','Nathula Pass','Rumtek Monastery','Pelling','Yuksom'],
  'Tamil Nadu':['Meenakshi Amman Temple','Brihadeeswarar Temple','Mahabalipuram','Ooty','Rameswaram'],
  'Telangana':['Charminar','Golconda Fort','Warangal Fort','Ramoji Film City','Thousand Pillar Temple'],
  'Tripura':['Ujjayanta Palace','Neermahal Palace','Unakoti','Sepahijala Wildlife Sanctuary','Jampui Hills'],
  'Uttar Pradesh':['Agra Fort','Sarnath','Fatehpur Sikri','Ayodhya Ram Mandir','Lucknow Bara Imambara'],
  'Uttarakhand':['Rishikesh','Nainital','Kedarnath','Valley of Flowers','Mussoorie'],
  'West Bengal':['Victoria Memorial','Darjeeling Himalayan Railway','Sundarbans National Park','Howrah Bridge','Kalimpong'],
  'Andaman & Nicobar Islands':['Radhanagar Beach','Cellular Jail','Ross Island','Baratang Island','North Bay Island'],
  'Chandigarh':['Rock Garden','Sukhna Lake','Capitol Complex','Rose Garden','Le Corbusier Centre'],
  'Dadra & Nagar Haveli and Daman & Diu':['Diu Fort','Naida Caves','Jampore Beach','Silvassa Tribal Museum','Devka Beach'],
  'Delhi':['Red Fort','Qutub Minar','Humayuns Tomb','India Gate','Lotus Temple'],
  'Jammu & Kashmir':['Dal Lake','Gulmarg','Pahalgam','Sonamarg','Mughal Gardens'],
  'Ladakh':['Pangong Lake','Nubra Valley','Khardung La','Thiksey Monastery','Magnetic Hill'],
  'Lakshadweep':['Agatti Island','Bangaram Island','Kavaratti Beach','Minicoy Island','Kalpeni Island'],
  'Puducherry':['Auroville','Promenade Beach','Sri Aurobindo Ashram','Paradise Beach','French Quarter']
}

const imagePool = baseDestinations.flatMap(d => d.images || []).filter(Boolean)
const existingNames = new Set(baseDestinations.map(d => d.name))
const stateCounters = {}
const generated = []

Object.entries(stateAttractions).forEach(([state, names]) => {
  names.forEach((name, index) => {
    if (existingNames.has(name)) return
    const city = state === 'Rajasthan' ? ['Jaipur','Jodhpur','Jaisalmer','Pushkar','Sawai Madhopur'][index] :
      state === 'Kerala' ? ['Munnar','Varkala','Kovalam','Thekkady','Kochi'][index] :
      state === 'Uttar Pradesh' ? ['Agra','Varanasi','Fatehpur Sikri','Ayodhya','Lucknow'][index] :
      state === 'Goa' ? ['Panaji','Sanguem','Agonda','Panaji','Fontainhas'][index] :
      state === 'Karnataka' ? ['Mysuru','Badami','Coorg','Gokarna','Bandipur'][index] : names[index]
    const category = index % 4 === 0 ? 'Heritage' : index % 4 === 1 ? 'Nature' : index % 4 === 2 ? 'Religious' : 'Adventure'
    const bestSeason = category === 'Nature' ? (index % 2 ? 'Monsoon' : 'Winter') : category === 'Adventure' ? 'Winter' : category === 'Religious' ? 'Year-round' : 'Winter'
    const id = `${state.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`
    generated.push({
      id, name, city, state, category,
      description:`A memorable ${category.toLowerCase()} experience in ${state}, showcasing the region's landscapes, stories and local character.`,
      historicalSignificance:`A curated highlight of ${state}'s cultural and geographic heritage, offering visitors a closer look at local traditions and landmarks.`,
      bestTimeToVisit: bestSeason === 'Monsoon' ? 'June – September' : bestSeason === 'Summer' ? 'April – June' : bestSeason === 'Year-round' ? 'Year-round' : 'October – March',
      bestSeason, popularity: 55 + ((index * 7 + state.length * 3) % 46),
      entryFee: index % 3 === 0 ? 'Varies by attraction' : 'Free / nominal fee',
      timings:'Daylight hours / attraction timings vary', location:`${name}, ${state}`, verified:true,
      images:[imagePool[(generated.length + index) % Math.max(imagePool.length,1)] || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=90'], nearbyAttractions:[]
    })
  })
})

const merged = [...baseDestinations, ...generated].map((d, i) => ({
  ...d,
  bestSeason: d.bestSeason || (i % 4 === 0 ? 'Winter' : i % 4 === 1 ? 'Summer' : i % 4 === 2 ? 'Monsoon' : 'Year-round'),
  popularity: Number.isFinite(Number(d.popularity)) ? Number(d.popularity) : 72 + ((i * 11) % 29),
  status: d.status || (d.verified ? 'Verified' : 'Pending Review'),
  lastUpdated: d.lastUpdated || 'Recently updated'
}))

const byState = Object.fromEntries(Object.keys(stateAttractions).map(s => [s, merged.filter(d => d.state === s).length]))
export const destinations = merged
export const destinationCountByState = byState
