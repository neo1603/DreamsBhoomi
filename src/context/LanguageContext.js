import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    nav_home: 'Home',
    nav_projects: 'Projects',
    nav_properties: 'Properties',
    nav_enquire: 'Enquire Now',
    nav_portfolio: 'Portfolio',
    nav_calculator: 'EMI Calculator',
    nav_events: 'Events',
    nav_about: 'About',
    nav_contact: 'Contact',

    hero_eyebrow: 'Mathura–Vrindavan · since 2008',
    hero_title_1: 'Find your',
    hero_title_accent: 'dream property',
    hero_title_2: 'in Vrindavan',
    hero_subtitle: 'Premium residential plots, luxury villas, and commercial properties — transparent dealings since 2008.',
    hero_view_projects: 'View Projects',
    hero_call_now: 'Call Now',
    hero_whatsapp: 'WhatsApp',
    stat_families: 'Happy Families',
    stat_projects: 'Projects',
    stat_years: 'Years Experience',
    hero_ghat: '15 min to Vishram Ghat →',
    hero_photo_tag: 'Ongoing · Kvaan Tower',
    hero_photo_title: 'Krishna Nagar, Mathura',
    hero_photo_sub: 'Showrooms + flats, ready to move',
    hero_photo_tag_2: 'Ongoing · Commercial',
    hero_photo_title_2: 'Goverdhan Chauraha, Mathura',
    hero_photo_sub_2: 'High-visibility shop, ready',

    portfolio_title: 'Our Portfolio',
    featured_title: 'Featured Projects',
    view_all_projects: 'View All Projects',
    featured_properties_title: 'Featured Properties',
    properties_count: (n) => `${n} properties across Mathura–Vrindavan`,
    featured_properties_subtitle: 'Individual houses, shops, plots and apartments available now.',
    view_all_properties: 'View All Properties',
    portfolio_count: (n) => `${n} projects across Mathura–Vrindavan`,
    portfolio_subtitle: 'Residential plots, villas, flats and commercial properties — ongoing, upcoming, and completed.',
    view_map: 'View Map',
    details: 'Details',
    tab_all: 'All',
    filter_all_cities: 'All Cities',
    filter_all_types: 'All Types',
    filter_all_status: 'All Status',
    filter_sort_by: 'Sort By',
    filter_sort_default: 'Default',
    filter_sort_price_low: 'Price: Low to High',
    filter_sort_price_high: 'Price: High to Low',
    filter_search_placeholder: 'Search by location, project or property',
    filter_search_button: 'Search',
    projects_page_title: 'Our Projects',
    projects_page_subtitle: 'Browse every residential and commercial listing across Mathura–Vrindavan and Agra.',
    properties_page_title: 'Our Properties',
    properties_page_subtitle: 'Individual houses, shops, plots and apartments across Mathura–Vrindavan and Agra.',
    no_projects_found: 'No projects match these filters — try widening your search.',
    similar_projects: 'Similar Projects',
    spec_area: 'Area',
    spec_facing: 'Facing',
    spec_status: 'Status',
    spec_possession: 'Possession',

    calc_title: 'EMI Calculator',
    calc_subtitle: 'Get a quick estimate of your monthly instalment before you talk to us about financing.',
    calc_amount: 'Loan amount',
    calc_rate: 'Interest rate',
    calc_tenure: 'Loan tenure',
    calc_years: 'years',
    calc_monthly_emi: 'Monthly EMI',
    calc_principal: 'Principal',
    calc_total_interest: 'Total interest',
    calc_total_payment: 'Total payment',
    calc_disclaimer: "Estimate only — actual EMI depends on the lender's terms. Speak to our team for financing partners.",

    events_title: 'Events & Celebrations',
    events_subtitle: 'Moments from our journey with the families and partners who make DreamsBhoomi what it is.',

    about_title: 'About DreamsBhoomi',
    about_p1: 'Established in 2008, DreamsBhoomi Developers is a real estate and construction business based in the Mathura–Vrindavan region, dealing in residential plots, flats, villas, and commercial properties.',
    about_p2: 'Our current flagship project, Kvaan Tower, sits opposite Hotel Madhuvan in Krishna Nagar, Mathura — a gated, MVDA-approved development with showrooms on the ground and first floors and flats above. Alongside it, we handle commercial listings across the region, including high-visibility properties like our Goverdhan Chauraha shop.',
    about_p3: 'With over 15 years of experience and 1,000+ families served, we deal in real estate in the most ethical way we know how, to help our customers in Shri Dham Vrindavan find land, homes, and commercial space they can trust.',
    stat_founded: 'Founded',
    stat_brij_years: 'Years in Brij',

    contact_title: 'Contact Us',
  },
  hi: {
    nav_home: 'होम',
    nav_projects: 'प्रोजेक्ट्स',
    nav_properties: 'प्रॉपर्टीज',
    nav_enquire: 'पूछताछ करें',
    nav_portfolio: 'परियोजनाएं',
    nav_calculator: 'ईएमआई कैलकुलेटर',
    nav_events: 'आयोजन',
    nav_about: 'हमारे बारे में',
    nav_contact: 'संपर्क करें',

    hero_eyebrow: 'मथुरा–वृंदावन · 2008 से',
    hero_title_1: 'अपनी',
    hero_title_accent: 'सपनों की संपत्ति',
    hero_title_2: 'आज ही पाएं',
    hero_subtitle: 'मथुरा वृंदावन क्षेत्र में प्रीमियम आवासीय प्लॉट, लक्जरी विला और व्यावसायिक संपत्तियां। 2008 में स्थापित, हमने पारदर्शी व्यवहार और गुणवत्तापूर्ण निर्माण के साथ 1000+ परिवारों को खुशहाल घर दिए हैं।',
    hero_view_projects: 'परियोजनाएं देखें',
    hero_call_now: 'अभी कॉल करें',
    hero_whatsapp: 'व्हाट्सएप',
    stat_families: 'खुशहाल परिवार',
    stat_projects: 'परियोजनाएं',
    stat_years: 'वर्षों का अनुभव',
    hero_ghat: 'विश्राम घाट से 15 मिनट →',
    hero_photo_tag: 'निर्माणाधीन · क्वान टावर',
    hero_photo_title: 'कृष्णा नगर, मथुरा',
    hero_photo_sub: 'शोरूम + फ्लैट्स, रहने के लिए तैयार',
    hero_photo_tag_2: 'निर्माणाधीन · व्यावसायिक',
    hero_photo_title_2: 'गोवर्धन चौराहा, मथुरा',
    hero_photo_sub_2: 'उच्च-दृश्यता दुकान, तैयार',

    portfolio_title: 'हमारी परियोजनाएं',
    featured_title: 'विशेष परियोजनाएं',
    view_all_projects: 'सभी परियोजनाएं देखें',
    featured_properties_title: 'विशेष संपत्तियां',
    properties_count: (n) => `मथुरा–वृंदावन में ${n} संपत्तियां`,
    featured_properties_subtitle: 'अभी उपलब्ध मकान, दुकानें, प्लॉट और अपार्टमेंट।',
    view_all_properties: 'सभी संपत्तियां देखें',
    portfolio_count: (n) => `मथुरा–वृंदावन में ${n} परियोजनाएं`,
    portfolio_subtitle: 'आवासीय प्लॉट, विला, फ्लैट और व्यावसायिक संपत्तियां — निर्माणाधीन, आगामी और पूर्ण।',
    view_map: 'मानचित्र देखें',
    details: 'विवरण',
    tab_all: 'सभी',
    filter_all_cities: 'सभी शहर',
    filter_all_types: 'सभी प्रकार',
    filter_all_status: 'सभी स्थिति',
    filter_sort_by: 'क्रमबद्ध करें',
    filter_sort_default: 'डिफ़ॉल्ट',
    filter_sort_price_low: 'कीमत: कम से ज्यादा',
    filter_sort_price_high: 'कीमत: ज्यादा से कम',
    filter_search_placeholder: 'स्थान, परियोजना या संपत्ति खोजें',
    filter_search_button: 'खोजें',
    projects_page_title: 'हमारी परियोजनाएं',
    projects_page_subtitle: 'मथुरा–वृंदावन और आगरा में हर आवासीय और व्यावसायिक लिस्टिंग देखें।',
    properties_page_title: 'हमारी संपत्तियां',
    properties_page_subtitle: 'मथुरा–वृंदावन और आगरा में मकान, दुकानें, प्लॉट और अपार्टमेंट।',
    no_projects_found: 'इन फ़िल्टर से कोई परियोजना नहीं मिली — अपनी खोज व्यापक करें।',
    similar_projects: 'समान परियोजनाएं',
    spec_area: 'क्षेत्रफल',
    spec_facing: 'दिशा',
    spec_status: 'स्थिति',
    spec_possession: 'कब्ज़ा',

    calc_title: 'ईएमआई कैलकुलेटर',
    calc_subtitle: 'वित्तपोषण के बारे में हमसे बात करने से पहले अपनी मासिक किस्त का त्वरित अनुमान लगाएं।',
    calc_amount: 'ऋण राशि',
    calc_rate: 'ब्याज दर',
    calc_tenure: 'ऋण अवधि',
    calc_years: 'वर्ष',
    calc_monthly_emi: 'मासिक ईएमआई',
    calc_principal: 'मूल राशि',
    calc_total_interest: 'कुल ब्याज',
    calc_total_payment: 'कुल भुगतान',
    calc_disclaimer: 'यह केवल अनुमान है — वास्तविक ईएमआई ऋणदाता की शर्तों पर निर्भर करती है। वित्तपोषण भागीदारों के लिए हमारी टीम से बात करें।',

    events_title: 'आयोजन और उत्सव',
    events_subtitle: 'उन परिवारों और भागीदारों के साथ हमारी यात्रा के पल, जो ड्रीम्सभूमि को बनाते हैं जो यह है।',

    about_title: 'ड्रीम्सभूमि के बारे में',
    about_p1: '2008 में स्थापित, ड्रीम्सभूमि डेवलपर्स मथुरा–वृंदावन क्षेत्र में स्थित एक रियल एस्टेट और निर्माण व्यवसाय है, जो आवासीय प्लॉट, फ्लैट, विला और व्यावसायिक संपत्तियों का काम करता है।',
    about_p2: 'हमारी वर्तमान प्रमुख परियोजना, क्वान टावर, कृष्णा नगर, मथुरा में होटल मधुवन के सामने स्थित है — एक गेटेड, एमवीडीए-अनुमोदित विकास जिसमें ग्राउंड और पहली मंजिल पर शोरूम और ऊपर फ्लैट हैं। इसके साथ ही, हम पूरे क्षेत्र में व्यावसायिक संपत्तियां भी संभालते हैं, जिसमें गोवर्धन चौराहा स्थित हमारी दुकान जैसी उच्च-दृश्यता वाली संपत्तियां शामिल हैं।',
    about_p3: '15 से अधिक वर्षों के अनुभव और 1,000+ परिवारों की सेवा के साथ, हम श्री धाम वृंदावन में अपने ग्राहकों को भरोसेमंद जमीन, घर और व्यावसायिक स्थान खोजने में मदद करने के लिए सबसे नैतिक तरीके से रियल एस्टेट का काम करते हैं।',
    stat_founded: 'स्थापना',
    stat_brij_years: 'ब्रज में वर्ष',

    contact_title: 'संपर्क करें',
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (key, ...args) => {
    const value = translations[lang][key] ?? translations.en[key] ?? key;
    return typeof value === 'function' ? value(...args) : value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
