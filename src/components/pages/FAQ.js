import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestion, FaSearch } from 'react-icons/fa';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqs = [
    {
      category: 'Account & Login',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'To create an account, click on the "Login" button in the top right corner of the page, then select "Create Account". Fill in your details including name, email, and password, and submit the form. You\'ll receive a verification email to activate your account.'
        },
        {
          question: 'I forgot my password. How can I reset it?',
          answer: 'If you forgot your password, click on the "Login" button, then select "Forgot Password". Enter the email address associated with your account, and we\'ll send you a link to reset your password.'
        },
        {
          question: 'How do I become a facilitator?',
          answer: 'To become a facilitator, first create a regular account. Then navigate to your profile settings and click on "Request Facilitator Access". Fill out the application form with your educational background and experience. Our team will review your request within 3-5 business days.'
        }
      ]
    },
    {
      category: 'Resources & Content',
      questions: [
        {
          question: 'Are all resources on the platform free?',
          answer: 'Yes, all educational resources on our platform are completely free. We believe in making quality education accessible to everyone regardless of financial circumstances.'
        },
        {
          question: 'What types of resources can I find on the platform?',
          answer: 'Our platform offers a variety of educational resources including lesson plans, worksheets, presentations, video tutorials, interactive activities, assessment tools, and subject-specific guides. Resources span across different educational levels from elementary to higher education.'
        },
        {
          question: 'How can I upload my own educational resources?',
          answer: 'To upload resources, you need facilitator access. Once approved as a facilitator, you can upload resources by navigating to your dashboard and clicking on "Upload Resource". Follow the prompts to add details about your resource, categorize it, and upload the files.'
        },
        {
          question: 'Can I use the resources for my classroom or teaching?',
          answer: 'Absolutely! All resources on our platform are intended for educational use. You\'re welcome to use them in your classroom, teaching materials, or personal learning. We just ask that you credit the original creator when possible.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'What file formats are supported for resource uploads?',
          answer: 'We support a wide range of file formats including PDF, DOCX, PPT, PPTX, XLS, XLSX, MP4, MP3, ZIP, and most common image formats (JPG, PNG, GIF). If you need to upload a file in a different format, please contact our support team.'
        },
        {
          question: 'How can I report a technical issue with the website?',
          answer: 'If you encounter any technical issues, you can report them through our "Contact Us" page. Provide as much detail as possible about the issue, including what page you were on, what you were trying to do, and any error messages you received. Screenshots are also very helpful.'
        },
        {
          question: 'Is there a mobile app for the platform?',
          answer: 'Currently, we don\'t have a dedicated mobile app, but our website is fully responsive and optimized for mobile devices. You can access all features through your mobile browser. We\'re considering developing a mobile app in the future based on user feedback.'
        }
      ]
    },
    {
      category: 'Copyright & Usage',
      questions: [
        {
          question: 'What is your copyright policy for uploaded resources?',
          answer: 'Creators retain copyright for their original materials. By uploading, you grant our platform a non-exclusive license to display and distribute your content to users. Users can use materials for educational purposes but should credit the original creator and cannot sell or redistribute the materials commercially.'
        },
        {
          question: 'Can I use resources from this platform in my publications?',
          answer: 'Resources from our platform are primarily for educational use. If you wish to include them in publications, you must obtain permission from the original creator and provide proper attribution. Commercial use requires explicit permission from the resource creator.'
        },
        {
          question: 'How do I report copyright infringement?',
          answer: 'If you believe that content on our platform infringes on your copyright, please contact us immediately through our "Contact" page. Include information about the original work, the content you believe is infringing, and your contact information. We take copyright concerns seriously and will investigate promptly.'
        }
      ]
    }
  ];
  
  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  // Function to count total questions
  const totalQuestions = faqs.reduce((total, category) => total + category.questions.length, 0);
  
  // Filter FAQs based on search term
  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);
  
  // Count filtered questions
  const filteredQuestionCount = filteredFaqs.reduce((total, category) => total + category.questions.length, 0);
  
  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our platform, resources, and more.</p>
      </div>
      
      <div className="faq-search">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm && (
          <p className="search-results">
            {filteredQuestionCount} results found for "{searchTerm}"
          </p>
        )}
      </div>
      
      <div className="faq-categories">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h2>{category.category}</h2>
              
              <div className="faq-questions">
                {category.questions.map((faq, questionIndex) => {
                  // Generate a unique index for this question
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  
                  return (
                    <div 
                      key={questionIndex} 
                      className={`faq-item ${activeIndex === globalIndex ? 'active' : ''}`}
                    >
                      <div 
                        className="faq-question"
                        onClick={() => toggleQuestion(globalIndex)}
                      >
                        <div className="question-icon">
                          <FaQuestion />
                        </div>
                        <h3>{faq.question}</h3>
                        <div className="toggle-icon">
                          {activeIndex === globalIndex ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                      </div>
                      
                      {activeIndex === globalIndex && (
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <FaQuestion size={40} />
            <h3>No matching questions found</h3>
            <p>Try adjusting your search terms or browse all questions.</p>
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
      
      <div className="faq-cta">
        <h2>Still have questions?</h2>
        <p>If you couldn't find the answer you were looking for, feel free to reach out to us directly.</p>
        <button className="contact-btn" onClick={() => window.location.href = '/contact'}>
          Contact Us
        </button>
      </div>
      
      <div className="faq-stats">
        <p>Browse all <span>{totalQuestions}</span> frequently asked questions</p>
      </div>
    </div>
  );
};

export default FAQ; 