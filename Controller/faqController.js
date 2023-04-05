const { findByIdAndRemove, findById, findOne } = require("../Model/User");
const FAQ = require("../Model/faq");
const moment = require('moment');


const CreateFAQ = async (req, res) => {
  try {
    let { question, answer } = req.body;
    question = question.trim();
    answer = answer.trim();
    if (
      !(
        answer ||
        question 
      )
    ) {
      return res.status(500).json({
        message: "Internal server Error",
      });
    }
    const newDoc = new FAQ({
      answer,
      question,
    });
    newDoc.save()
    .then(doc => {
      console.log(doc); 
    })
    .catch(err => {
      console.error(err);
    });

    if (!newDoc) {
      return res.status(500).json({
        message: "user Error",
      });
    }

    return res.status(201).json({
      'FAQ': newDoc,
    });
  } catch (err) {
    throw err;
  }
};

const getFAQS = async (req, res) => {
  try {
    const Allfaq= await FAQ.find();
    res.status(200).json(Allfaq);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get Alerts" });
  }
};

const getFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).send();
    }
    res.send(faq);
  } catch (err) {
    res.status(500).send(err);
  }
};
const updateFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!faq) {
      return res.status(404).send();
    }
    res.status(201).send(faq);
  } catch (err) {
    res.status(500).send(err);
  }
};
const deleteFAQ= async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).send();
    }
    res.status(200).json({
      message: "record deleted succesfully",
      faq: faq,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.CreateFAQ = CreateFAQ;
exports.getFAQS = getFAQS;
exports.getFAQ = getFAQ;
exports.updateFAQ = updateFAQ;
exports.deleteFAQ = deleteFAQ;
