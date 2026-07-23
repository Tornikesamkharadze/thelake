/**
 * Static legal document supplied by the client (frontend/privacy-policy.html).
 * Rendered server-side (no client JS required) so it is fully crawlable/indexable.
 * Markup/text below is copied verbatim from the client's file; only class names
 * were prefixed with "pp-" to scope the styles and avoid clashing with the
 * site's global CSS.
 */

const PP_CSS = `
  .pp-page { max-width:820px; margin:0 auto; background:#FFFFFF; font-family:'Sylfaen','Noto Sans Georgian','Segoe UI',Helvetica,Arial,sans-serif; color:#26231E; }
  .pp-head { text-align:center; padding:44px 48px 8px 48px; }
  .pp-head .pp-kicker { font-size:12px; letter-spacing:3px; color:#55524C; text-transform:uppercase; font-weight:bold; }
  .pp-head h1 { font-family:Georgia,'Sylfaen',serif; font-weight:400; font-size:34px; margin:10px 0 6px 0; color:#14120F; }
  .pp-head .pp-sub { font-style:italic; color:#55524C; font-size:15px; margin-bottom:18px; }
  .pp-divider { width:56px; height:3px; background:#EE5D40; margin:18px auto 0 auto; }
  .pp-body { padding:26px 48px 56px 48px; }
  table.pp-meta { width:100%; border-collapse:collapse; margin:26px 0 34px 0; font-size:14px; }
  table.pp-meta th, table.pp-meta td { border:1px solid #CFC8BC; padding:9px 14px; text-align:left; vertical-align:middle; }
  table.pp-meta th { background:#F5F1E8; width:32%; color:#14120F; font-weight:bold; }
  h2.pp-article { font-size:17px; color:#14120F; border-bottom:1px solid #CFC8BC; padding-bottom:8px; margin:36px 0 14px 0; }
  h2.pp-article .pp-n { color:#C94F35; margin-right:6px; }
  p.pp-cl { font-size:14.5px; line-height:1.75; margin:0 0 12px 0; text-align:justify; padding-left:44px; text-indent:-44px; }
  p.pp-cl b.pp-n { color:#55524C; font-weight:bold; display:inline-block; width:44px; text-indent:0; }
  p.pp-sub2 { font-size:14.5px; line-height:1.7; margin:0 0 9px 0; text-align:justify; padding-left:96px; text-indent:-52px; }
  p.pp-sub2 span.pp-n { color:#55524C; display:inline-block; width:52px; text-indent:0; }
  @media (max-width:640px){ .pp-head,.pp-body{padding-left:22px;padding-right:22px;} p.pp-cl{padding-left:34px;text-indent:-34px;} p.pp-cl b.pp-n{width:34px;} p.pp-sub2{padding-left:72px;text-indent:-44px;} p.pp-sub2 span.pp-n{width:44px;} }
`;

const HEAD = {
  ka: {
    kicker: "სს „ფლეისმეიკერს ტბა“ • JSC Placemakers Tba",
    title: "Privacy Policy — The Lake",
    sub: "კონფიდენციალურობის პოლიტიკა / Rules of Personal Data Processing",
  },
  en: {
    kicker: "JSC Placemakers Tba • The Lake • Tba",
    title: "Privacy Policy",
    sub: "Rules of Personal Data Processing",
  },
};

const KA_CONTENT = `
<table class="pp-meta">
  <tr><th>დოკუმენტი</th><td>კონფიდენციალურობის პოლიტიკა</td></tr>
  <tr><th>შემდგენელი</th><td>სს „ფლეისმეიკერს ტბა“ (ს/კ: 405732747)</td></tr>
  <tr><th>მოქმედების სფერო</th><td>პროექტი „The Lake • ტბა“ — ვებგვერდი thelake.ge, საინფორმაციო გზავნილები და კლიენტებთან კომუნიკაცია</td></tr>
  <tr><th>ძალაში შესვლის თარიღი</th><td>21 ივლისი, 2026</td></tr>
  <tr><th>ვერსია</th><td>1.0</td></tr>
</table>

<h2 class="pp-article"><span class="pp-n">მუხლი 1.</span> ზოგადი დებულებები</h2>
<p class="pp-cl"><b class="pp-n">1.1.</b>წინამდებარე კონფიდენციალურობის პოლიტიკა (შემდგომში — „პოლიტიკა“) განსაზღვრავს სს „ფლეისმეიკერს ტბა“-ს (შემდგომში — „კომპანია“) მიერ პერსონალურ მონაცემთა დამუშავების წესებსა და პირობებს პროექტ „The Lake • ტბა“-სთან (შემდგომში — „პროექტი“) დაკავშირებით.</p>
<p class="pp-cl"><b class="pp-n">1.2.</b>პოლიტიკა ვრცელდება ვებგვერდის (thelake.ge) გამოყენებაზე, საინფორმაციო გზავნილების (ნიუსლეთერის) გამოწერაზე, საკონტაქტო და მოთხოვნის ფორმების შევსებაზე, ასევე კომპანიასთან ნებისმიერი ფორმით კომუნიკაციაზე.</p>
<p class="pp-cl"><b class="pp-n">1.3.</b>პერსონალურ მონაცემთა დამუშავება ხორციელდება „პერსონალურ მონაცემთა დაცვის შესახებ“ საქართველოს კანონისა და მოქმედი კანონმდებლობის მოთხოვნათა დაცვით.</p>

<h2 class="pp-article"><span class="pp-n">მუხლი 2.</span> მონაცემთა დამმუშავებელი</h2>
<p class="pp-cl"><b class="pp-n">2.1.</b>პერსონალურ მონაცემთა დამმუშავებელია: სს „ფლეისმეიკერს ტბა“ (ს/კ: 405732747), იურიდიული მისამართი: თუთას ქუჩა 15D, 0186 თბილისი, საქართველო.</p>
<p class="pp-cl"><b class="pp-n">2.2.</b>საკონტაქტო მონაცემები: ელფოსტა — info@placemakers.ge; ტელეფონი — +995 511 55 33 33; ვებგვერდი — www.thelake.ge.</p>

<h2 class="pp-article"><span class="pp-n">მუხლი 3.</span> დამუშავებას დაქვემდებარებული მონაცემები</h2>
<p class="pp-cl"><b class="pp-n">3.1.</b>კომპანია ამუშავებს შემდეგი კატეგორიის პერსონალურ მონაცემებს:</p>
<p class="pp-sub2"><span class="pp-n">3.1.1.</span>საიდენტიფიკაციო და საკონტაქტო მონაცემები — სახელი, გვარი, ელფოსტის მისამართი, ტელეფონის ნომერი;</p>
<p class="pp-sub2"><span class="pp-n">3.1.2.</span>მოთხოვნის შინაარსი — ინფორმაცია, რომელსაც სუბიექტი აწვდის კომპანიას საკონტაქტო ან მოთხოვნის ფორმის მეშვეობით (მათ შორის, დაინტერესების საგანი — მიწის ნაკვეთი, პრივატული სახლი ან ვილა);</p>
<p class="pp-sub2"><span class="pp-n">3.1.3.</span>კომუნიკაციის ისტორია — მიმოწერისა და შეხვედრების შესახებ ჩანაწერები;</p>
<p class="pp-sub2"><span class="pp-n">3.1.4.</span>ტექნიკური მონაცემები — IP მისამართი, ბრაუზერისა და მოწყობილობის მონაცემები, ქუქი-ფაილები (Cookies).</p>

<h2 class="pp-article"><span class="pp-n">მუხლი 4.</span> დამუშავების მიზნები და სამართლებრივი საფუძვლები</h2>
<p class="pp-cl"><b class="pp-n">4.1.</b>პერსონალური მონაცემები მუშავდება შემდეგი მიზნებით და საფუძვლებით:</p>
<p class="pp-sub2"><span class="pp-n">4.1.1.</span>საინფორმაციო გზავნილების (ნიუსლეთერის) მიწოდება — მონაცემთა სუბიექტის თანხმობის საფუძველზე;</p>
<p class="pp-sub2"><span class="pp-n">4.1.2.</span>მოთხოვნებზე რეაგირება და კონსულტაციის გაწევა — ხელშეკრულების დადების წინარე ურთიერთობის ფარგლებში;</p>
<p class="pp-sub2"><span class="pp-n">4.1.3.</span>პროექტის სიახლეების, შეთავაზებებისა და ღონისძიებების შესახებ ინფორმირება — თანხმობის ან კომპანიის ლეგიტიმური ინტერესის საფუძველზე;</p>
<p class="pp-sub2"><span class="pp-n">4.1.4.</span>კანონმდებლობით დადგენილ ვალდებულებათა შესრულება.</p>

<h2 class="pp-article"><span class="pp-n">მუხლი 5.</span> მარკეტინგული კომუნიკაცია</h2>
<p class="pp-cl"><b class="pp-n">5.1.</b>სუბიექტი საინფორმაციო გზავნილებს იღებს მხოლოდ საკუთარი თანხმობის საფუძველზე — ნიუსლეთერის გამოწერის ან პროექტით დაინტერესებისას თანხმობის გამოხატვის შემდეგ.</p>
<p class="pp-cl"><b class="pp-n">5.2.</b>სუბიექტს უფლება აქვს ნებისმიერ დროს, დამატებითი განმარტების გარეშე, უარი განაცხადოს მარკეტინგულ გზავნილებზე — თითოეულ გზავნილში განთავსებული „გამოწერის გაუქმების“ ბმულით ან კომპანიისთვის წერილობითი მიმართვით.</p>
<p class="pp-cl"><b class="pp-n">5.3.</b>თანხმობის გამოხმობა არ ახდენს გავლენას გამოხმობამდე განხორციელებული დამუშავების კანონიერებაზე. მოთხოვნა მარკეტინგული მიზნით დამუშავების შეწყვეტის შესახებ სრულდება არაუგვიანეს კანონით დადგენილი ვადისა.</p>

<h2 class="pp-article"><span class="pp-n">მუხლი 6.</span> მონაცემთა გაზიარება და გადაცემა</h2>
<p class="pp-cl"><b class="pp-n">6.1.</b>კომპანია არ ყიდის და არ გადასცემს პერსონალურ მონაცემებს მესამე პირებს მათი მარკეტინგული მიზნებისთვის.</p>
<p class="pp-cl"><b class="pp-n">6.2.</b>მონაცემები შესაძლოა გადაეცეს მხოლოდ: (ა) კომპანიის დავალებით მოქმედ მომსახურების პროვაიდერებს (ელფოსტის დაგზავნის პლატფორმა, ჰოსტინგი, CRM სისტემა), რომლებიც შეზღუდულნი არიან კონფიდენციალურობის ვალდებულებით; (ბ) უფლებამოსილ სახელმწიფო ორგანოებს — მხოლოდ კანონით გათვალისწინებულ შემთხვევებში.</p>
<p class="pp-cl"><b class="pp-n">6.3.</b>ცალკეული პროვაიდერის სერვერები შესაძლოა განთავსებული იყოს საქართველოს ფარგლებს გარეთ; ასეთ შემთხვევაში მონაცემთა გადაცემა ხორციელდება კანონმდებლობით დადგენილი დაცვის გარანტიების შესაბამისად.</p>

<h2 class="pp-article"><span class="pp-n">მუხლი 7.</span> მონაცემთა შენახვის ვადები</h2>
<p class="pp-cl"><b class="pp-n">7.1.</b>მონაცემები ინახება მხოლოდ დამუშავების მიზნის მისაღწევად აუცილებელი ვადით: ნიუსლეთერთან დაკავშირებული მონაცემები — გამოწერის გაუქმებამდე; მოთხოვნებთან დაკავშირებული მონაცემები — კომუნიკაციის დასრულებიდან გონივრული ვადით; კანონით პირდაპირ გათვალისწინებულ შემთხვევებში — შესაბამისი სავალდებულო ვადით.</p>
<p class="pp-cl"><b class="pp-n">7.2.</b>შენახვის ვადის გასვლის შემდეგ მონაცემები წაიშლება ან გაუპიროვნდება.</p>

<h2 class="pp-article"><span class="pp-n">მუხლი 8.</span> მონაცემთა სუბიექტის უფლებები</h2>
<p class="pp-cl"><b class="pp-n">8.1.</b>მონაცემთა სუბიექტს უფლება აქვს:</p>
<p class="pp-sub2"><span class="pp-n">8.1.1.</span>მიიღოს ინფორმაცია მის შესახებ მონაცემთა დამუშავების თაობაზე და მოითხოვოს მათი ასლი;</p>
<p class="pp-sub2"><span class="pp-n">8.1.2.</span>მოითხოვოს არასწორი, არაზუსტი ან არასრული მონაცემების გასწორება, განახლება ან შევსება;</p>
<p class="pp-sub2"><span class="pp-n">8.1.3.</span>მოითხოვოს მონაცემთა დამუშავების შეწყვეტა, წაშლა, განადგურება ან დაბლოკვა;</p>
<p class="pp-sub2"><span class="pp-n">8.1.4.</span>ნებისმიერ დროს გამოიხმოს თანხმობა;</p>
<p class="pp-sub2"><span class="pp-n">8.1.5.</span>მიმართოს პერსონალურ მონაცემთა დაცვის სამსახურს (www.pdps.ge) ან სასამართლოს.</p>
<p class="pp-cl"><b class="pp-n">8.2.</b>უფლებათა განსახორციელებლად სუბიექტი მიმართავს კომპანიას ელფოსტაზე info@placemakers.ge. კომპანია მოთხოვნას განიხილავს და პასუხობს კანონმდებლობით დადგენილ ვადაში.</p>

<h2 class="pp-article"><span class="pp-n">მუხლი 9.</span> მონაცემთა უსაფრთხოება</h2>
<p class="pp-cl"><b class="pp-n">9.1.</b>კომპანია იყენებს შესაბამის ორგანიზაციულ და ტექნიკურ ზომებს მონაცემთა შემთხვევითი ან უკანონო განადგურების, შეცვლის, გამჟღავნების, მოპოვების ან სხვაგვარი უკანონო გამოყენებისგან დასაცავად.</p>
<p class="pp-cl"><b class="pp-n">9.2.</b>პერსონალურ მონაცემებზე წვდომა აქვთ მხოლოდ იმ უფლებამოსილ პირებს, რომლებსაც ეს სამსახურებრივ მოვალეობათა შესასრულებლად ესაჭიროებათ.</p>

<h2 class="pp-article"><span class="pp-n">მუხლი 10.</span> ქუქი-ფაილები (Cookies)</h2>
<p class="pp-cl"><b class="pp-n">10.1.</b>ვებგვერდი thelake.ge შესაძლოა იყენებდეს ქუქი-ფაილებს ვებგვერდის გამართული ფუნქციონირებისა და სტატისტიკური ანალიზის მიზნით.</p>
<p class="pp-cl"><b class="pp-n">10.2.</b>მომხმარებელს შეუძლია ბრაუზერის პარამეტრებით შეზღუდოს ან გამორთოს ქუქი-ფაილები; ამან შესაძლოა იმოქმედოს ვებგვერდის ცალკეულ ფუნქციაზე.</p>

<h2 class="pp-article"><span class="pp-n">მუხლი 11.</span> არასრულწლოვანთა მონაცემები</h2>
<p class="pp-cl"><b class="pp-n">11.1.</b>კომპანიის მომსახურება და კომუნიკაცია განკუთვნილია სრულწლოვანი პირებისთვის. კომპანია მიზანმიმართულად არ ამუშავებს არასრულწლოვანთა პერსონალურ მონაცემებს.</p>

<h2 class="pp-article"><span class="pp-n">მუხლი 12.</span> ცვლილებები და დასკვნითი დებულებები</h2>
<p class="pp-cl"><b class="pp-n">12.1.</b>კომპანია უფლებამოსილია პერიოდულად განაახლოს პოლიტიკა. განახლებული რედაქცია ქვეყნდება ამავე გვერდზე, ძალაში შესვლის თარიღის მითითებით; არსებითი ცვლილების შემთხვევაში სუბიექტებს დამატებით ეცნობებათ.</p>
<p class="pp-cl"><b class="pp-n">12.2.</b>პოლიტიკასთან დაკავშირებული ნებისმიერი საკითხის შესახებ შეგიძლიათ მიმართოთ კომპანიას: სს „ფლეისმეიკერს ტბა“, თუთას ქუჩა 15D, 0186 თბილისი; info@placemakers.ge; +995 511 55 33 33.</p>
`;

const EN_CONTENT = `
<table class="pp-meta">
  <tr><th>Document</th><td>Privacy Policy</td></tr>
  <tr><th>Issued by</th><td>JSC Placemakers Tba (ID code: 405732747)</td></tr>
  <tr><th>Scope</th><td>The Lake • Tba project — website thelake.ge, newsletters and client communication</td></tr>
  <tr><th>Effective date</th><td>July 21, 2026</td></tr>
  <tr><th>Version</th><td>1.0</td></tr>
</table>

<h2 class="pp-article"><span class="pp-n">Article 1.</span> General Provisions</h2>
<p class="pp-cl"><b class="pp-n">1.1.</b>This Privacy Policy (the “Policy”) sets out the rules and conditions under which JSC Placemakers Tba (the “Company”) processes personal data in connection with The Lake • Tba project (the “Project”).</p>
<p class="pp-cl"><b class="pp-n">1.2.</b>The Policy applies to the use of the website (thelake.ge), subscription to newsletters, completion of contact and enquiry forms, and any other form of communication with the Company.</p>
<p class="pp-cl"><b class="pp-n">1.3.</b>Personal data is processed in compliance with the Law of Georgia on Personal Data Protection and other applicable legislation.</p>

<h2 class="pp-article"><span class="pp-n">Article 2.</span> Data Controller</h2>
<p class="pp-cl"><b class="pp-n">2.1.</b>The data controller is JSC Placemakers Tba (ID code: 405732747), registered address: 15D Tuta Street, 0186 Tbilisi, Georgia.</p>
<p class="pp-cl"><b class="pp-n">2.2.</b>Contact details: email — info@placemakers.ge; phone — +995 511 55 33 33; website — www.thelake.ge.</p>

<h2 class="pp-article"><span class="pp-n">Article 3.</span> Categories of Data Processed</h2>
<p class="pp-cl"><b class="pp-n">3.1.</b>The Company processes the following categories of personal data:</p>
<p class="pp-sub2"><span class="pp-n">3.1.1.</span>Identification and contact details — first name, last name, email address, phone number;</p>
<p class="pp-sub2"><span class="pp-n">3.1.2.</span>Content of enquiries — information provided by the data subject through contact or enquiry forms (including the subject of interest — a land plot, a private house or a villa);</p>
<p class="pp-sub2"><span class="pp-n">3.1.3.</span>Communication history — records of correspondence and meetings;</p>
<p class="pp-sub2"><span class="pp-n">3.1.4.</span>Technical data — IP address, browser and device data, cookies.</p>

<h2 class="pp-article"><span class="pp-n">Article 4.</span> Purposes and Legal Bases of Processing</h2>
<p class="pp-cl"><b class="pp-n">4.1.</b>Personal data is processed for the following purposes and on the following legal bases:</p>
<p class="pp-sub2"><span class="pp-n">4.1.1.</span>Delivery of newsletters — on the basis of the data subject’s consent;</p>
<p class="pp-sub2"><span class="pp-n">4.1.2.</span>Responding to enquiries and providing consultations — within the framework of pre-contractual relations;</p>
<p class="pp-sub2"><span class="pp-n">4.1.3.</span>Informing about Project news, offers and events — on the basis of consent or the Company’s legitimate interest;</p>
<p class="pp-sub2"><span class="pp-n">4.1.4.</span>Compliance with obligations established by law.</p>

<h2 class="pp-article"><span class="pp-n">Article 5.</span> Marketing Communications</h2>
<p class="pp-cl"><b class="pp-n">5.1.</b>The data subject receives newsletters solely on the basis of their own consent — following subscription or an expression of interest in the Project.</p>
<p class="pp-cl"><b class="pp-n">5.2.</b>The data subject may opt out of marketing communications at any time and without explanation — via the “unsubscribe” link included in every message, or by written request to the Company.</p>
<p class="pp-cl"><b class="pp-n">5.3.</b>Withdrawal of consent does not affect the lawfulness of processing carried out prior to the withdrawal. Requests to cease processing for marketing purposes are fulfilled no later than within the period established by law.</p>

<h2 class="pp-article"><span class="pp-n">Article 6.</span> Disclosure and Transfer of Data</h2>
<p class="pp-cl"><b class="pp-n">6.1.</b>The Company does not sell personal data and does not disclose it to third parties for their own marketing purposes.</p>
<p class="pp-cl"><b class="pp-n">6.2.</b>Data may be disclosed only to: (a) service providers acting on the Company’s instructions (email delivery platform, hosting, CRM system), bound by confidentiality obligations; and (b) competent public authorities — solely where required by law.</p>
<p class="pp-cl"><b class="pp-n">6.3.</b>Certain providers may host data on servers located outside Georgia; in such cases the transfer is carried out subject to the safeguards required by applicable legislation.</p>

<h2 class="pp-article"><span class="pp-n">Article 7.</span> Retention Periods</h2>
<p class="pp-cl"><b class="pp-n">7.1.</b>Data is retained only for the period necessary to achieve the purpose of processing: newsletter data — until unsubscription; enquiry-related data — for a reasonable period after the end of communication; where expressly required by law — for the applicable mandatory period.</p>
<p class="pp-cl"><b class="pp-n">7.2.</b>Upon expiry of the retention period, data is deleted or anonymised.</p>

<h2 class="pp-article"><span class="pp-n">Article 8.</span> Rights of the Data Subject</h2>
<p class="pp-cl"><b class="pp-n">8.1.</b>The data subject has the right to:</p>
<p class="pp-sub2"><span class="pp-n">8.1.1.</span>Obtain information on the processing of their data and request a copy thereof;</p>
<p class="pp-sub2"><span class="pp-n">8.1.2.</span>Request correction, updating or completion of inaccurate or incomplete data;</p>
<p class="pp-sub2"><span class="pp-n">8.1.3.</span>Request cessation of processing, deletion, destruction or blocking of the data;</p>
<p class="pp-sub2"><span class="pp-n">8.1.4.</span>Withdraw consent at any time;</p>
<p class="pp-sub2"><span class="pp-n">8.1.5.</span>Apply to the Personal Data Protection Service of Georgia (www.pdps.ge) or to a court.</p>
<p class="pp-cl"><b class="pp-n">8.2.</b>To exercise these rights, the data subject may contact the Company at info@placemakers.ge. The Company reviews and responds to requests within the time limits established by law.</p>

<h2 class="pp-article"><span class="pp-n">Article 9.</span> Data Security</h2>
<p class="pp-cl"><b class="pp-n">9.1.</b>The Company applies appropriate organisational and technical measures to protect data against accidental or unlawful destruction, alteration, disclosure, acquisition or any other unlawful use.</p>
<p class="pp-cl"><b class="pp-n">9.2.</b>Access to personal data is limited to authorised persons who require it for the performance of their professional duties.</p>

<h2 class="pp-article"><span class="pp-n">Article 10.</span> Cookies</h2>
<p class="pp-cl"><b class="pp-n">10.1.</b>The thelake.ge website may use cookies to ensure its proper functioning and for statistical analysis.</p>
<p class="pp-cl"><b class="pp-n">10.2.</b>Users may restrict or disable cookies through their browser settings; this may affect certain features of the website.</p>

<h2 class="pp-article"><span class="pp-n">Article 11.</span> Data of Minors</h2>
<p class="pp-cl"><b class="pp-n">11.1.</b>The Company’s services and communications are intended for adults. The Company does not knowingly process personal data of minors.</p>

<h2 class="pp-article"><span class="pp-n">Article 12.</span> Amendments and Final Provisions</h2>
<p class="pp-cl"><b class="pp-n">12.1.</b>The Company may update this Policy from time to time. The updated version is published on this page with its effective date; in the event of material changes, data subjects will be additionally notified.</p>
<p class="pp-cl"><b class="pp-n">12.2.</b>Any matters relating to this Policy may be addressed to: JSC Placemakers Tba, 15D Tuta Street, 0186 Tbilisi, Georgia; info@placemakers.ge; +995 511 55 33 33.</p>
`;

export default async function PrivacyPolicyPage({ params }) {
  const { locale } = await params;
  const isKa = locale === "ka";
  const head = isKa ? HEAD.ka : HEAD.en;
  const contentHtml = isKa ? KA_CONTENT : EN_CONTENT;

  return (
    <main style={{ background: "#F7ECD8", padding: "40px 16px" }}>
      <style>{PP_CSS}</style>
      <div className="pp-page">
        <div className="pp-head">
          <div className="pp-kicker">{head.kicker}</div>
          <h1>{head.title}</h1>
          <div className="pp-sub">{head.sub}</div>
          <div className="pp-divider" />
        </div>
        <div
          className="pp-body"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </main>
  );
}
