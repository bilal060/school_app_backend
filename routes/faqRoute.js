const express = require('express')
const { CreateFAQ,getFAQS,getFAQ,updateFAQ,deleteFAQ } = require('../Controller/faqController');
const faqrouter = express.Router()

faqrouter.post('/faqs',CreateFAQ);
faqrouter.get('/faqs',getFAQS);
faqrouter.get('/faqs/:id',getFAQ);
faqrouter.patch('/faqs/:id',updateFAQ);
faqrouter.delete('/faqs/:id',deleteFAQ);

module.exports =faqrouter;