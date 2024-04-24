// *********************Backend Start********************
import { useEffect, useState } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link  } from "react-router-dom";
import Main from "./components/Main";
import SearchBar from "./Context/Context2";
import GrapesJSEditor from './components/GrapesJSEditor';
import PageList from './components/PageList';
import DynamicPage from './components/dynamic';
import HomePage from './components/homepage';
import Layout from './components/layout';
import NavigationManager from './components/NavigationManager';
import FooterSettingsForm from './components/footersetting';
import FAQManager from './components/Faqmanager';
import BlogCreationForm from './components/blogsmanager';
import { useNavigate } from 'react-router-dom';
import TeamMemberManager from './components/teammanager';
import TestimonialsManager from './components/testimonialmanager';
// *********************Backend Finish********************




// import Project_Dubai from "./components/Project_Dubai/Project_Dubai";
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Buy from "./components/Buy/Buy";
import PhoneField from "./components/CommonElements/PhoneField";
import About from "./components/about/About";
import Blog from "./components/blog/Blog";
import Blog_internal from "./components/blog/Blog_internal";
import OffPlan from "./components/OffPlan/OffPlan";
import Sale from "./components/sale/Sale";
import SingleProperty from './components/internapage/Internal'
import Mortage_Services from "./components/Mortage/Mortage_Services";
import Faq from "./components/faq/Faq";
import Advisory from "./components/advisory/Advisory";
import Why_us from "./components/whyus/Why_us";
import Career_At from "./components/career_at/Career_At";
import ThanksPage from "./components/Notification/ThanksPage";
import Testimonials from "./components/testimonials/Testimonials";
import Meet_My_Team from "./components/meet-team/Meet_My_Team";
import For_rent from './components/rent/For_Rent';
import Privacy from "./components/privacy/Privacy";
import Term_condition from "./components/terms-condition/Term_condition";
import PropMan from "./components/PManagement/PropMan";
import Cookies from "./components/cookies-pol/Cookies";
import Contact from "./components/Contact/contact";
import Our_offices from "./components/our-offices/Our_offices";
import Residential from "./components/residential/Residential";
import Commercial from "./components/Commercial/Commercial";
import OffPlanSecond from "./components/OffPlan/OffPlanSe";
import OffPlanInternal from "./components/OffPlan/OffPlanInt";
import First_blog from "./components/blog/First_blog";
import Second_blog from "./components/blog/Second_blog";
import Third_blog from "./components/blog/Third_blog";
import Fourth from "./components/blog/Fourth";
import Testimonials1 from "./components/testimonials/Testimonials";
import Homeagedata from "./components/DatabaseData/Homeagedata";
import SaleData from "./components/DatabaseData/SaleData";
import OtherPages from "./components/DatabaseData/OtherPages";


// **************************************Admin Panel*******************************************


import UserContextProvider from "./Context/UserContextProvider"
import AdminSidebar from "./components/admin/Sidebar";
import AdminDashboard from './components/admin/Dashboard';
import AdminMain from './components/admin/Main';
import AdminPropertyDetail from './components/admin/PropertyDetail';
import AdminPropertyList from './components/admin/PropertyList';
import AdminAbout from './components/admin/About';
import AdminViewPage from './components/admin/ViewPage';
import AdminJoinus from './components/admin/Joinus';
import AdminContact from './components/admin/Contact';
import AdminAdvisory from './components/admin/Advisory';
import AdminPropertyManagement from './components/admin/PropertyManagement';
import AdminAboutViewPage from './components/admin/AboutViewPage';
import AdminMortagageService from './components/admin/MortgageService';
import AdminMortagageViewPage from './components/admin/MortgageViewpage';
import AdminOurTeam from './components/admin/OurTeam';
import AdminOurTeamViewPage from './components/admin/OurTeamViewPage';
import AdminSell from './components/admin/Sell';
import AdminSellViewPage from './components/admin/SellViewPage';
import AdminOffPlan from './components/admin/OffPlan';
import AdminOffPlanViewPage from './components/admin/offplanViewPage';
import AdminBuyPage from './components/admin/BuyPage';
import AdminBuyPageViewPage from './components/admin/BuyPageViewPage';
import AdminFandQ from './components/admin/FandQ';
import AdminFandQViewPage from './components/admin/FandQViewPage';
import AdminCommercial from './components/admin/Commercial';
import AdminJoinUsViewPage from './components/admin/JoinUsViewPage';
import AdminContactViewPage from './components/admin/ContactViewPage';
import AdminAdvisoryViewPage from './components/admin/AdvisoryViewPage';
import AdminPropertyManagementViewPage from './components/admin/propertyManagementViewPage';
import AdminCommercialViewPage from './components/admin/CommercialViewPage';
import AdminWhyUs from './components/admin/WhyUs';
import AdminWhyUsViewPage from './components/admin/WhyUsViewPage';
import AdminHome from './components/admin/Home'
import AdminFacility from './components/admin/Facility';
import AdminSEO from './components/admin/SEO';
import AdminLogin from './components/admin/Login';
import AdminCookie from "./components/admin/Cookies";
import AdminBlogSection from "./components/admin/BlogPage";
import Admintermsandcondition from "./components/admin/TermCondition"
import Adminprivacy from './components/admin/Privacy'
import AdminRentPage from './components/admin/RentPage'
import NewDevelop from "./components/admin/NewDevelopments";
import Private from "./components/admin/Private";
import Adminteammember from "./components/admin/Teammember"
// import AddMember from "./components/admin/AddMember";
// **********************************Admin Panel Finish****************************************

function App() {
	// ******************Backend**********
	
  const [showEditor, setShowEditor] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [navigationItems, setNavigationItems] = useState([]);
  const [faqItems, setFaqItems] = useState([]);
  const [blogsItems, setBlogsItems] = useState([]);
  const [testimonialItems, setTestimonialItems] = useState([]);
  const [teamItems, setTeamItems] = useState([]);
  const [loading, setLoading] = useState(true);
	
	  const handleAddPage = () => {
    setSelectedPageId(null);
    setShowEditor(true);
  };

  const handleSelectPage = (pageId) => {
    setSelectedPageId(pageId);
    setShowEditor(true);
  };

  const handleBack = () => {
    setSelectedPageId(null);
    setShowEditor(false);
  };

  useEffect(() => {
    fetchNavigationItems();
    fetchfaqs();
    fetchblogs();
    fetchteams();
    fetchtestimonials();
}, []);
	
	
	const fetchNavigationItems = () => {
  axios.get('/api/navigation')
      .then(response => {
          setNavigationItems(response.data);
          setLoading(false);
      })
      .catch(error => console.error('Error fetching navigation items:', error));
};

const fetchfaqs = () => {
    axios.get('/api/faqs')
        .then(response => {
            setFaqItems(response.data);
            setLoading(false);
        })
        .catch(error => console.error('Error fetching navigation items:', error));
  };

  const fetchblogs= () => {
    axios.get('/api/blogs')
        .then(response => {
            setBlogsItems(response.data);
            setLoading(false);
        })
        .catch(error => console.error('Error fetching navigation items:', error));
  };
  const fetchteams= () => {
    axios.get('/api/team-members')
        .then(response => {
            setTeamItems(response.data);
            setLoading(false);
        })
        .catch(error => console.error('Error fetching navigation items:', error));
  };

  const fetchtestimonials= () => {
    axios.get('/api/testimonials')
        .then(response => {
            setTestimonialItems(response.data);
            setLoading(false);
        })
        .catch(error => console.error('Error fetching navigation items:', error));
  };
	
	// ******************Backend**************
	
  const [newproperty, setnewproperty] = useState("")
  const [who, setwho] = useState("")
  const rootname = localStorage.getItem("rootproperty")

  useEffect(() => {
    const user = localStorage.getItem("admin")
    setwho(user)
  }, [])
	
	  useEffect(()=>{
    const rootname2 = localStorage.getItem("rootproperty")
    setnewproperty(rootname2)
  },[rootname])
	

	
  return (
    <>
      {who === "%@#^#%&^*%^&$%@@^@%$%^,^$#@@#8757636345^$%^$%&32422" ?
        <div>
        
          <UserContextProvider >
            <Routes>
              {/* // ****************Admin Route*********************** */}

                <Route element={<Private />}>
               		
					         <Route exact path="/backend" element={
                            <BackendComponent
                                showEditor={showEditor}
                                selectedPageId={selectedPageId}
                                onBack={handleBack}
                                onAddPage={handleAddPage}
                                onSelectPage={handleSelectPage}
                                navigationItems={navigationItems}
                                blogsItems={blogsItems}
                                teamItems={teamItems}
                                faqItems={faqItems}
                                testimonialItems= {testimonialItems}

                                loading={loading}
                            />
                        } />
                        <Route path="/:pageUrl" element={<DynamicPage />} />
                        <Route path="/navigation" element={<NavigationManager />} />

                        <Route path="/footersetting" element={< FooterSettingsForm />} />
                        <Route path="/blogsetting" element={< BlogCreationForm />} />
                        <Route path="/faqsetting" element={< FAQManager />} />
                        <Route path="/teamsetting" element={< TeamMemberManager />} />
                        <Route path="/testimonialsetting" element={< TestimonialsManager />} />

              </Route>
              {/* <Route exact path="/addmember" Component={AddMember} /> */}
              <Route exact path="/admin&login&raine&horni&123&75694&securly" Component={AdminLogin} />
            </Routes>
          </UserContextProvider>
          
          {/* // **********************************Admin Route Finish**************************************** */}
        </div>


        :

        <>
          <div id="guest-main-div">
            <SearchBar>
              <Header />

              <Routes>
			      <Route path="/:pageUrl" element={<DynamicPage />} />
                    
                <Route exact path="/" Component={Main} />
                <Route exact path="/buyproperties" Component={Buy} />
                <Route exact path="/rentproperties" Component={For_rent} />
                <Route exact path="/phone" Component={PhoneField} />
                <Route exact path="/offplan" Component={OffPlan} />
                <Route exact path="/aboutus" Component={About} />
                <Route exact path="/blog" Component={Blog} />
                <Route exact path="/blogone" Component={Blog_internal} />
                <Route exact path="/sale" Component={Sale} />
                <Route exact path="/singleproperty" Component={SingleProperty} />
                <Route exact path="/mortgageservices" Component={Mortage_Services} />
                <Route exact path="/faqpage" Component={Faq} />
                <Route exact path="/advisory" Component={Advisory} />
                <Route exact path="/whyus" Component={Why_us} />
                <Route exact path="/career" Component={Career_At} />
                <Route exact path="/thanks" Component={ThanksPage} />
                <Route exact path="/testimonials" Component={Testimonials} />
                <Route exact path="/meetmyteam" Component={Meet_My_Team} />
                <Route exact path="/privacy" Component={Privacy} />
                <Route exact path="/t&c" Component={Term_condition} />
                <Route exact path="/cookies" Component={Cookies} />
                <Route exact path="/property&management" Component={PropMan} />
                <Route exact path="/contact&us" Component={Contact} />
                <Route exact path="/offices" Component={Our_offices} />
                <Route exact path="/residential" Component={Residential} />
                <Route exact path="/commercial" Component={Commercial} />
                <Route exact path="/offsec" Component={OffPlanSecond} />
                <Route exact path="/offplan&properties" Component={OffPlanInternal} />
                <Route exact path="/blogfirst" Component={First_blog} />
                <Route exact path="/second" Component={Second_blog} />
                <Route exact path="/third" Component={Third_blog} />
                <Route exact path="/fourth" Component={Fourth} />
                <Route exact path="/test" Component={Testimonials1} />
                <Route exact path="/homeformdata" Component={Homeagedata} />
                <Route exact path="/saleformdata" Component={SaleData} />
                <Route exact path="/otherpagesdata" Component={OtherPages} />
                <Route exact path="/admin&login&raine&horni&123&75694&securly" Component=                     {AdminLogin} />
              </Routes>

              <Footer />
					
            </SearchBar>
          </div>

        </>
      }
    </>
  );
}

// ********************Backend************d
const BackendComponent = ({
  showEditor,
  selectedPageId,
  onBack,
  onAddPage,
  onSelectPage,
  navigationItems,
  blogsItems,
  teamItems,
  faqItems,
  testimonialItems,
  loading
}) => {
  let navigate = useNavigate();
  let sno = 0; // Initialize the counter
  let sno1 = 0; // Initialize the counter
  let sno2 = 0; // Initialize the counter
  let sno3 = 0; // Initialize the counter
  let sno4 = 0; // Initialize the counter


  const handlenavigationpage = () => {
      navigate('/navigation');
  };

  const handlefooter = () => {
    navigate('/footersetting');
};

const handleblogs = () => {
    navigate('/blogsetting');
};

const handlefaqs = () => {
    navigate('/faqsetting');
};


const handleteams = () => {
    navigate('/teamsetting');
};
const handletests = () => {
    navigate('/testimonialsetting');
};






  return (
      <>
          {showEditor ? (
              <GrapesJSEditor pageId={selectedPageId} onBack={onBack} />
          ) : (
              <>
                  <div className="container box">
                    <div class="row">
                      <div className="header">
                          <h1>Rh Dubai Backend</h1>
                      </div>
                      <div className="editor-header">
                          <div className="title-container">
                              <h1>Pages List</h1>
                          </div>
                          <div className="buttons-container">
                              <button onClick={onAddPage} className="main-button">Add New Page</button>
                          </div>
                      </div>
                      <div class="col-md-10 offset-1">
                      <PageList onSelectPage={onSelectPage} />

                      <div className="editor-header">
                          <div className="title-container">
                              <h1>Navigation Details</h1>
                          </div>
                          <div className="buttons-container">
                              <button onClick={handlenavigationpage} className="main-button">Change Navigation</button>
                          </div>
                      </div>
                      
                      {loading ? <p>Loading...</p> : (
                          <table className="table table-striped" style={styles.table}>
                              <thead>
                                  <tr>
                                  <th style={styles.tableHeader}>S.No</th>
            
                                    
                                      <th style={styles.tableHeader}>Title</th>
                                      <th style={styles.tableHeader}>Link</th>
                                      <th style={styles.tableHeader}>Position</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {navigationItems.map(item => (
                                      <tr key={item.id}>
                                         <td style={styles.tableCell}>{++sno}</td> {/* Increment the counter */}
             
                                          <td style={styles.tableCell}>{item.title}</td>
                                          <td style={styles.tableCell}>/{item.urls}</td>
                                          <td style={styles.tableCell}>{item.position}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      )}

                      
                        <div className="editor-header">
                          <div className="title-container">
                              <h1>Footer Settings</h1>
                          </div>
                          <div className="buttons-container">
                              <button onClick={handlefooter} className="main-button">Change Footer</button>
                          </div>
                      </div>


                      <div className="editor-header">
                          <div className="title-container">
                              <h1>Blogs Settings</h1>
                          </div>
                          <div className="buttons-container">
                              <button onClick={handleblogs} className="main-button">Add More Blogs</button>
                          </div>
                      </div>

                      {loading ? <p>Loading...</p> : (
                          <table className="table table-striped" style={styles.table}>
                              <thead>
                                  <tr>
                                      <th style={styles.tableHeader}>S.No</th>
            
                                      <th style={styles.tableHeader}>Blog Title</th>
                                      <th style={styles.tableHeader}>Blog Description</th>
                                      <th style={styles.tableHeader}>Blog Url</th>
                                      <th style={styles.tableHeader}>Blog Date</th>
                                     
                                  </tr>
                              </thead>
                              <tbody>
                                  {blogsItems.map(item => (
                                      <tr key={item.id}>
                                         <td style={styles.tableCell}>{++sno1}</td> {/* Increment the counter */}
             
                                          <td style={styles.tableCell}>{item.title}</td>
                                          <td style={styles.tableCell}>{item.content}</td>
                                          <td style={styles.tableCell}>/{item.url}</td>
                                          <td style={styles.tableCell}>{item.date}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      )}

                      <div className="editor-header">
                          <div className="title-container">
                              <h1>FAQs Settings</h1>
                          </div>
                          <div className="buttons-container">
                              <button onClick={handlefaqs} className="main-button">Change FAQ</button>
                          </div>
                      </div>

                      {loading ? <p>Loading...</p> : (
                          <table className="table table-striped" style={styles.table}>
                              <thead>
                                  <tr>
                                  <th style={styles.tableHeader}>S.No</th>
            
                                      <th style={styles.tableHeader}>FAQ Title</th>
                                      <th style={styles.tableHeader}>FAQ Answer</th>
                            
                                  </tr>
                              </thead>
                              <tbody>
                                  {faqItems.map(item => (
                                      <tr key={item.id}>
                                        <td style={styles.tableCell}>{++sno2}</td> {/* Increment the counter */}
             
                                          <td style={styles.tableCell}>{item.question}</td>
                                          <td style={styles.tableCell}>{item.answer}</td>
                                        
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      )}


                      <div className="editor-header">
                          <div className="title-container">
                              <h1>Our Team Settings</h1>
                          </div>
                          <div className="buttons-container">
                              <button onClick={handleteams} className="main-button">Change Team Members</button>
                          </div>
                      </div>

                      {loading ? <p>Loading...</p> : (
                          <table className="table table-striped" style={styles.table}>
                              <thead>
                                  <tr>
                                  <th style={styles.tableHeader}>S.No</th>
            
                                      <th style={styles.tableHeader}>Team Member Name</th>
                                      <th style={styles.tableHeader}>Image</th>
                                      <th style={styles.tableHeader}>Designation</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {teamItems.map(item => (
                                      <tr key={item.id}>
                                        <td style={styles.tableCell}>{++sno3}</td> {/* Increment the counter */}
             
                                          <td style={styles.tableCell}>{item.name}</td>
                                          <td style={styles.tableCell}><img src={`uploads/${item.photo}`} alt={`Photo of ${item.name}`} width="50" /></td>
                                          <td style={styles.tableCell}>{item.designation}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      )}


                    <div className="editor-header">
                          <div className="title-container">
                              <h1>Our Testimonial Settings</h1>
                          </div>
                          <div className="buttons-container">
                              <button onClick={handletests} className="main-button">Add More Testimonials</button>
                          </div>
                      </div>

                      {loading ? <p>Loading...</p> : (
                          <table className="table table-striped" style={styles.table}>
                              <thead>
                                  <tr>
                                  <th style={styles.tableHeader}>S.No</th>
            
                                      <th style={styles.tableHeader}>Reviewer Name</th>
                                      <th style={styles.tableHeader}>Review</th>
                                      <th style={styles.tableHeader}>Rating</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {testimonialItems.map(item => (
                                      <tr key={item.TID}>
                                         <td style={styles.tableCell}>{++sno4}</td> {/* Increment the counter */}
             
                                          <td style={styles.tableCell}>{item.Name}</td>
                                          <td style={styles.tableCell}>{item.Review}</td>
                                          <td style={styles.tableCell}>{item.Star}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      )}
                  </div>
                  </div>
                  </div>
              </>
          )}
      </>
  );
};

const styles = {

  editButton: {
      marginLeft: '10px',
      padding: '5px 10px',
      fontSize: '0.8em',
      cursor: 'pointer'
  },
  container: {
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto'
  },
  form: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px'
  },
  input: {
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd'
  },
  button: {
      padding: '10px 15px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#4CAF50',
      color: 'white',
      cursor: 'pointer'
  },
  list: {
      listStyleType: 'none',
      padding: 0
  },
  listItem: {
      marginBottom: '10px'
  },
  title: {
      textAlign: 'center',
      color: '#333',
  },
  deleteButton: {
      marginLeft: '10px',
      padding: '5px 10px',
      fontSize: '0.8em',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
  },
  table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
  },
  tableHeader: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px',
      textAlign: 'left',
  },
  tableCell: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
  },
};

export default App;

