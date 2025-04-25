import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1>Terms of Service</h1>
        <p>Last Updated: June 15, 2023</p>
      </div>
      
      <div className="terms-content">
        <div className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using the Educational Resource Blog ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
          <p>We reserve the right to modify these terms at any time, and such modifications shall be effective immediately upon posting on the Service. Your continued use of the Service constitutes your agreement to be bound by such modifications.</p>
        </div>
        
        <div className="terms-section">
          <h2>2. Description of Service</h2>
          <p>Educational Resource Blog is a platform designed to provide educational resources for students, teachers, and lifelong learners. The Service allows users to browse, download, and in some cases, upload educational materials.</p>
          <p>We do not guarantee that the Service will be uninterrupted or error-free. We reserve the right to change, suspend, or discontinue any aspect of the Service at any time.</p>
        </div>
        
        <div className="terms-section">
          <h2>3. User Accounts</h2>
          <p>Some features of the Service require registration for an account. You agree to provide accurate and complete information when registering and to update your information to keep it accurate and current.</p>
          <p>You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.</p>
          <p>We reserve the right to terminate accounts, in our sole discretion, for any reason including but not limited to violation of these Terms of Service.</p>
        </div>
        
        <div className="terms-section">
          <h2>4. User Content</h2>
          <p>The Service may allow users to upload, post, or otherwise make available content ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such content in connection with the Service.</p>
          <p>You represent and warrant that you own or have the necessary rights to User Content you submit and that such content does not violate the rights of any third party, including copyright, trademark, privacy, or other personal or proprietary rights.</p>
          <p>We reserve the right, but not the obligation, to review, refuse, or remove any User Content at our sole discretion.</p>
        </div>
        
        <div className="terms-section">
          <h2>5. Prohibited Uses</h2>
          <p>You agree not to use the Service for any unlawful purpose or in a way that could damage, disable, overburden, or impair the Service. Prohibited activities include but are not limited to:</p>
          <ul>
            <li>Uploading or sharing content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
            <li>Impersonating any person or entity</li>
            <li>Using the Service for commercial solicitation without our consent</li>
            <li>Attempting to gain unauthorized access to other users' accounts or any part of the Service</li>
            <li>Collecting personal information about other users without their consent</li>
            <li>Interfering with the proper functioning of the Service</li>
          </ul>
        </div>
        
        <div className="terms-section">
          <h2>6. Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are owned by Educational Resource Blog and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
          <p>Educational resources on the platform may be subject to different intellectual property rights as stated in their individual descriptions. Users should respect these rights when using the resources.</p>
        </div>
        
        <div className="terms-section">
          <h2>7. Disclaimer of Warranties</h2>
          <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
          <p>We do not warrant that the Service will be uninterrupted or error-free, that defects will be corrected, or that the Service or the server that makes it available are free of viruses or other harmful components.</p>
        </div>
        
        <div className="terms-section">
          <h2>8. Limitation of Liability</h2>
          <p>IN NO EVENT SHALL EDUCATIONAL RESOURCE BLOG, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.</p>
          <p>Our liability shall be limited to the maximum extent permitted by law, and under no circumstances will our aggregate liability exceed the amount you paid, if any, for accessing the Service.</p>
        </div>
        
        <div className="terms-section">
          <h2>9. Indemnification</h2>
          <p>You agree to defend, indemnify, and hold harmless Educational Resource Blog, its officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses arising from your use of the Service or your violation of these Terms of Service.</p>
        </div>
        
        <div className="terms-section">
          <h2>10. Governing Law</h2>
          <p>These Terms of Service shall be governed by and construed in accordance with the laws of [Country/State], without regard to its conflict of law provisions.</p>
          <p>Any dispute arising from or relating to these Terms of Service shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].</p>
        </div>
        
        <div className="terms-section">
          <h2>11. Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <p>Email: legal@resourceblog.edu</p>
          <p>Address: 123 Education Street, Learning District, Knowledge City, 54321</p>
        </div>
      </div>
      
      <div className="terms-footer">
        <p>By using the Educational Resource Blog, you acknowledge that you have read these Terms of Service, understood them, and agree to be bound by them.</p>
        <p>If you do not agree to these terms, please do not use the Service.</p>
      </div>
    </div>
  );
};

export default Terms; 