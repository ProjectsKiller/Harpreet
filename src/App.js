// *********************Backend Start********************
import React, { useEffect, useState ,useContext} from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Modal from 'react-modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Blog from "./components/blog/Blog";
import Main from "./components/Main";
import SearchBar from "./Context/Context2";
import GrapesJSEditor from './components/GrapesJSEditor';
import FlagShow from "./components/FlagShow";

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
import NewDevelop from "./components/admin/NewDevelopments";

// *********************Backend Finish********************
import AdminHome from "./components/admin/Home";
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from "jquery";


import Header from "./components/Header";
import Footer from "./components/Footer";
import Buy from "./components/Buy/Buy";
import PhoneField from "./components/CommonElements/PhoneField";


import OffPlan from "./components/OffPlan/OffPlan";
import SingleProperty from './components/internapage/Internal'
import Mortage_Services from "./components/Mortage/Mortage_Services";
import Faq from "./components/faq/Faq";
import ThanksPage from "./components/Notification/ThanksPage";
import Testimonials from "./components/testimonials/Testimonials";
import Meet_My_Team from "./components/meet-team/Meet_My_Team";
import For_rent from './components/rent/For_Rent';
import Our_offices from "./components/our-offices/Our_offices";
import Residential from "./components/residential/Residential";
import Commercial from "./components/Commercial/Commercial";
import OffPlanSecond from "./components/OffPlan/OffPlanSe";
import OffPlanInternal from "./components/OffPlan/OffPlanInt";


import Testimonials1 from "./components/testimonials/Testimonials";
import Homeagedata from "./components/DatabaseData/Homeagedata";
import SaleData from "./components/DatabaseData/SaleData";
import OtherPages from "./components/DatabaseData/OtherPages";


// **************************************Admin Panel*******************************************


import UserContextProvider from "./Context/UserContextProvider"
import AdminDashboard from './components/admin/Dashboard';
import AdminMain from './components/admin/Main';
import AdminLogin from './components/admin/Login';
import Private from "./components/admin/Private";
import MortagageService from "./components/admin/MortgageService";
import Freshdev from "./components/Freshdev";
import { NewOffplanPage } from "./components/NewOffplanPage";
import FreshDev from "./components/OffPlan/OffPlanInt";
import SearchContext from "./Context/Context1";
import MapWithSearchForm from "./components/Location";
import GodsPlan from "./components/Freshdev";
import Freshinternal from "./components/Freshinternal";
import BrochurePopup from "./components/Notification/Brochurepopup";
import Chat from "./components/chat/Chat";

// **********************************Admin Panel Finish****************************************

function App() {
    // ******************Backend**********

    const [showEditor, setShowEditor] = useState(false);
    const [Newproperties, setNewproperties] = useState([]);
    const [selectedPageId, setSelectedPageId] = useState(null);
    const [navigationItems, setNavigationItems] = useState([]);
    const [faqItems, setFaqItems] = useState([]);
    const [blogsItems, setBlogsItems] = useState([]);
    const [testimonialItems, setTestimonialItems] = useState([]);
    const [teamItems, setTeamItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [getoffpages, setgetoffpages] = useState([]);

    $(document).ready(function () {
        setTimeout(function () {
            $('#examplenav').DataTable();
        }, 800);
    });

    $(document).ready(function () {
        setTimeout(function () {
            $('#example').DataTable();
        }, 800);
    });
    $(document).ready(function () {
        setTimeout(function () {
            $('#exampleblog').DataTable();
        }, 800);
    });
    $(document).ready(function () {
        setTimeout(function () {
            $('#exampleteam').DataTable();
        }, 800);
    });
    $(document).ready(function () {
        setTimeout(function () {
            $('#examplefaq').DataTable();
        }, 800);
    });
    $(document).ready(function () {
        setTimeout(function () {
            $('#exampletest').DataTable();
        }, 800);
    });

    const handleAddPage = () => {
        setSelectedPageId(null);
        setShowEditor(true);
        localStorage.setItem("pagesvalue", "pages")
    };
    const handleNewProperty = () => {
        setSelectedPageId(null);
        setShowEditor(true);
        localStorage.setItem("pagesvalue", "newproperty")
    };


    const handlePropertyEdit = (pageId) => {

        setSelectedPageId(pageId);
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
        fetchNewItems();
        fetchfaqs();
        fetchblogs();
        fetchteams();
        fetchtestimonials();
        fetchOffPage();
    }, []);


    const fetchNewItems = () => {
        axios.get('http://localhost:4000/api/newpropertiespage')
            .then(response => {
                setNewproperties(response.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching navigation items:', error));
    };

    const fetchNavigationItems = () => {
        axios.get('http://localhost:4000/api/navigation')
            .then(response => {
                setNavigationItems(response.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching navigation items:', error));
    };

    const fetchOffPage = () => {
        axios.get('http://localhost:4000/fecthoffpage')
            .then(response => {
                setgetoffpages(response.data.combinedResults);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching navigation items:', error));
    };

    const fetchfaqs = () => {
        axios.get('http://localhost:4000/api/getfaqs')
            .then(response => {
                setFaqItems(response.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching navigation items:', error));
    };

    const fetchblogs = () => {
        axios.get('http://localhost:4000/api/blogs')
            .then(response => {
                setBlogsItems(response.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching navigation items:', error));
    };
    const fetchteams = () => {
        axios.get('http://localhost:4000/api/team-members')
            .then(response => {
                setTeamItems(response.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching navigation items:', error));
    };

    const fetchtestimonials = () => {
        axios.get('http://localhost:4000/api/testimonials')
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

    useEffect(() => {
        const rootname2 = localStorage.getItem("rootproperty")
        setnewproperty(rootname2)
    }, [rootname])


   const pagename= localStorage.getItem("pagename");
  console.log(pagename,"pagename agdjs jadgshuah ");
    return (
        <>
            <div id="guest-main-div">
                <UserContextProvider >
                    <SearchBar>
                        <Header />
                        <Routes>


                        <Route exact path="/newoffplan" Component={NewOffplanPage} />
                            <Route path={`/internalpage`} Component={FreshDev} />
                            <Route exact path="/" Component={Main} />
                            <Route exact path="/buy" Component={Buy} />
                            <Route exact path="/fresh" Component={GodsPlan} />
                            <Route exact path="/searchlocation" Component={MapWithSearchForm} />
                            <Route exact path="/" Component={FreshDev} />
                            <Route exact path="/chat" Component={Chat} />
                         

                            <Route exact path="/rent" Component={For_rent} />
                            <Route exact path="/newedit" Component={NewDevelop} />
                            <Route exact path="/phone" Component={PhoneField} />
                            <Route exact path="/offplan" Component={OffPlan} />
                            <Route exact path="/singleproperty" Component={SingleProperty} />
                            <Route exact path="/mortgageservices" Component={Mortage_Services} />
                            <Route exact path="/faqs" Component={Faq} />
                            <Route exact path="/thanks" Component={ThanksPage} />

                            <Route exact path="/meetmyteam" Component={Meet_My_Team} />
                            <Route exact path="/residential" Component={Residential} />
                            <Route exact path="/commercial" Component={Commercial} />
                            <Route exact path="/offsec" Component={OffPlanSecond} />
                            <Route exact path="/offplan&properties" Component={OffPlanInternal} />
                            <Route exact path="/test" Component={Testimonials1} />
                            <Route exact path="/testimonials" Component={Testimonials} />
                            <Route exact path="/homeformdata" Component={Homeagedata} />
                            <Route exact path="/saleformdata" Component={SaleData} />
                            <Route exact path="/otherpagesdata" Component={OtherPages} />

                            <Route path="/:pageUrl" element={<DynamicPage />} />
                            <Route exact path="/admin&login&raine&horni&123&75694&securly" Component={AdminLogin} />
                            <Route element={<Private />}>
                                <Route path="/:pageUrl" element={<DynamicPage />} />
                                <Route exact path="/" Component={Main} />
                                <Route exact path="/buy" Component={Buy} />
                                <Route exact path="/fint" Component={Freshinternal} />
                                <Route exact path="/bro" Component={BrochurePopup} />
                                

                           
                                <Route exact path="/flag" Component={FlagShow} />
                                <Route exact path="/blog" Component={Blog} />
                                <Route exact path="/rent" Component={For_rent} />
                                <Route exact path="/phone" Component={PhoneField} />
                                <Route exact path="/offplan" Component={OffPlan} />
                                <Route exact path="/singleproperty" Component={SingleProperty} />
                                <Route exact path="/mortgageservices" Component={Mortage_Services} />
                                <Route exact path="/faqs" Component={Faq} />

                                <Route exact path="/meetmyteam" Component={Meet_My_Team} />

                                <Route exact path="/residential" Component={Residential} />
                                <Route exact path="/commercial" Component={Commercial} />
                                <Route exact path="/offsec" Component={OffPlanSecond} />
                                <Route exact path="/offplan&properties" Component={OffPlanInternal} />
                                <Route exact path="/test" Component={Testimonials1} />
                                <Route exact path="/homeformdata" Component={Homeagedata} />

                                <Route exact path="/saleformdata" Component={SaleData} />
                                <Route exact path="/otherpagesdata" Component={OtherPages} />

                                <Route exact path="/admin&login&raine&horni&123&75694&securly" Component={AdminLogin} />
                                <Route exact path="/backend" element={
                                    <BackendComponent
                                        showEditor={showEditor}
                                        selectedPageId={selectedPageId}
                                        onBack={handleBack}
                                        onAddPage={handleAddPage}
                                        onAddNewProperty={handleNewProperty}
                                        onSelectPage={handleSelectPage}
                                        handlePropertyEdit={handlePropertyEdit}
                                        navigationItems={navigationItems}
                                        Newproperties={Newproperties}
                                        getoffpages={getoffpages}
                                        blogsItems={blogsItems}
                                        teamItems={teamItems}
                                        faqItems={faqItems}
                                        testimonialItems={testimonialItems}
                                        loading={loading}
                                    />
                                } />
                                <Route path="/:pageUrl" element={<DynamicPage />} />
                                <Route path="/navigation" element={<NavigationManager />} />

                                <Route path="/settingfooter" element={< FooterSettingsForm />} />
                                <Route path="/blogsetting" element={< BlogCreationForm />} />
                                <Route path="/faqsetting" element={< FAQManager />} />
                                <Route path="/teamsetting" element={< TeamMemberManager />} />
                                <Route path="/testimonialsetting" element={< TestimonialsManager />} />
                                <Route path="/Edithome" element={< AdminHome />} />
                                <Route path="/Editmortagage" element={< MortagageService />} />

                            </Route>
                        </Routes>
                        <Footer />

                    </SearchBar>
                </UserContextProvider>
            </div>
        </>
    );
}

// ********************Backend************
const BackendComponent = ({
    showEditor,
    selectedPageId,
    onBack,
    onAddNewProperty,
    onAddPage,
    handlePropertyEdit,
    onSelectPage,
    navigationItems,
    Newproperties,
    blogsItems,
    teamItems,
    faqItems,
    testimonialItems,
    getoffpages,
    loading
}) => {
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [showpage, setshowpage] = React.useState("dash");
    const [htmlduplicate, sethtmlduplicate] = useState([]);
    const [cssduplicate, setcssduplicate] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [linkAddress, setLinkAddress] = useState('');

    const [is_confirmModalOpen, setis_confirmModalOpen] = useState(false);
    const [selectedPagenewId, setSelectednewPageId] = useState(null);
    let sno = 0; // Initialize the counter
    let sno1 = 0; // Initialize the counter
    let sno2 = 0; // Initialize the counter
    let sno3 = 0; // Initialize the counter
    let sno4 = 0; // Initialize the counter

    const gotoHomepage = () => {
        navigate("/Edithome")
    };

    const gotoEditmortgage = () => {
        navigate("/Editmortagage")
    };

    const handlenavigationpage = () => {
        navigate('/navigation');
    };


    const handlefooter = () => {
        navigate('/settingfooter');
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

    const handlePropertyDuplicate = (pageId) => {

        setIsModalOpen(true);

        axios.get(`http://localhost:4000/api/pages/${pageId}`).then((res) => {

            const { fileContent, cssfile, result } = res.data;
            console.log(fileContent, "filcontent");
            sethtmlduplicate(fileContent);
            setcssduplicate(cssfile);
        })
    };

    const handleAddPage = (id) => {
        axios.put(`http://localhost:4000/addpageagain/${id}`).then((res) => {
            if (res.status === 200) {
                alert("Page is added again!")
            }
        })
    }

    const handleDelete = () => {
        // const [selectedPagenewId, setSelectednewPageId] = useState(null);
        const pageId = selectedPagenewId;
        // Replace this with your actual delete logic
        fetch(`http://localhost:4000/api/pages/${pageId}`, { method: 'DELETE' })
            .then(() => {
                alert('Page deleted successfully!');
                // Add any additional logic after successful deletion
            })
            .catch(error => console.error('Error deleting page:', error));
    };
    const handleChange = (event) => {
        const val = event.target.value
        setshowpage(val)
    };

    useEffect(() => {

    }, [showpage])


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSave = () => {
        alert("Going to the save the page")
        const html = htmlduplicate;
        const css = cssduplicate;
        const url = 'http://localhost:4000/api/save-page';
        const method = 'POST';
        const pageVal = "newproperty";
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, html, css, linkAddress, seoTitle, metaDescription, keywords, pageVal }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Page saved successfully!');
                setIsModalOpen(false);
                setTitle(title);
                setLinkAddress(linkAddress);
                setSeoTitle(seoTitle);
                setMetaDescription(metaDescription);
                setKeywords(keywords);
                // Handle any post-save actions
            })
            .catch(error => {
                console.error('Error saving page:', error);
            });
    };

    const openModal = (pageId) => {
        setSelectednewPageId(pageId);
        setis_confirmModalOpen(true);
    };

    const closeModal = () => {
        setSelectednewPageId(null);
        setis_confirmModalOpen(false);
    };

    const handleConfirm = async () => {
        closeModal();
        handleDelete(selectedPageId);
    };

    const handleCancel = () => {
        // Handle the action when the user cancels
        alert('Cancelled!');
        closeModal();
    };

    useEffect(() => {
    }, [is_confirmModalOpen])

    return (
        <>
            {showEditor ? (
                <GrapesJSEditor pageId={selectedPageId} onBack={onBack} />
            ) : (
                <>
                    <div className="" style={{
                        width: "87%", margin: "50px auto", justifyContent: "center",
                    }}>
                        <h1 className="all-main-heading text-center">Rh Dubai Backend</h1>

                        <div class="row p-2">
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel className="all-para" Label id="demo-controlled-open-select-label">Edit</InputLabel>
                                <Select labelId="demo-controlled-open-select-label" id="demo-controlled-open-select" open={open} onClose={handleClose} onOpen={handleOpen}
                                    label="Age" onChange={handleChange}>
                                    <MenuItem value="dash" className="all-para"><em>Dashboard</em></MenuItem>
                                    <MenuItem className="all-para" value="navbar">Navigation</MenuItem>
                                    <MenuItem className="all-para" value="pagelist">All Pages</MenuItem>
                                    <MenuItem className="all-para" value="newdevelop">New Development</MenuItem>
                                    <MenuItem className="all-para" value="blogs">Blogs</MenuItem>
                                    <MenuItem className="all-para" value="footer">Footer</MenuItem>
                                    <MenuItem className="all-para" value="Mortage">Mortage Page</MenuItem>
                                    <MenuItem className="all-para" value="Home">Home Page</MenuItem>
                                    <MenuItem className="all-para" value="team">Our Team</MenuItem>
                                    <MenuItem className="all-para" value="testimonials">Testimonials</MenuItem>
                                    <MenuItem className="all-para" value="Faq">Faq</MenuItem>
                                    <MenuItem value="recyclebin">Recycle Bin</MenuItem>
                                </Select>
                            </FormControl>

                            {showpage === "pagelist" ?
                                <>
                                    <div className="editor-header">
                                        <div className="title-container">
                                            <h1 className="all-main-heading">All Pages</h1>
                                        </div>

                                        <div className="buttons-container all-sub-heading">
                                            <button onClick={onAddPage} className="btn btn-warning h-10 mt-4 mx-2">Add New Page</button>
                                            <div>
                                                {/* <Button sx={{ display: 'block', mt: 2 }} onClick={handleOpen}>
                                              Edit Content
                                          </Button> */}

                                            </div>

                                        </div>

                                    </div>


                                    <PageList onSelectPage={onSelectPage} />
                                </>
                                : showpage === "newdevelopment" ?
                                    <>
                                        <div className="editor-header">
                                            <div className="title-container">
                                                <h1 className="all-main-heading">New Development</h1>
                                            </div>
                                            <div className="buttons-container all-sub-heading">
                                                <button onClick={onAddNewProperty} className="btn btn-warning h-10 mt-4 mx-2">Add New Property</button>
                                                <div>
                                                </div>
                                            </div>
                                        </div>
                                        {loading ? <p>Loading...</p> : (
                                            <table style={styles.table}>
                                                <thead>
                                                    <tr>
                                                        <th style={styles.tableHeader}>S.No</th>
                                                        <th style={styles.tableHeader}>Title</th>
                                                        <th style={styles.tableHeader}>SEO Title</th>
                                                        <th style={styles.tableHeader}>SEO Meta Description</th>
                                                        <th style={styles.tableHeader}>Link Address</th>
                                                        <th style={styles.tableHeader}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Newproperties.map(item => (
                                                        <tr key={item.id}>
                                                            <td style={styles.tableCell}>{1}</td>
                                                            <td style={styles.tableCell}>{item.title}</td>
                                                            <td style={styles.tableCell}>{item.seoTitle}</td>
                                                            <td style={styles.tableCell}>{item.metaDescription}</td>
                                                            <td style={styles.tableCell}>{item.linkAddress}</td>
                                                            <td style={styles.tableCell}>
                                                                <button className="btn btn-success mx-2" target="_blank"
                                                                    onClick={() => handlePropertyDuplicate(item.id)}
                                                                >Copy page</button>
                                                                <button className="btn btn-success mx-2" target="_blank"
                                                                    onClick={() => handlePropertyEdit(item.id)}
                                                                >Edit</button>
                                                                <button className="btn btn-danger" target="_blank"
                                                                    onClick={() => openModal(item.id)}
                                                                >Delete</button> <br />
                                                                {selectedPagenewId === item.id && is_confirmModalOpen &&
                                                                    <>
                                                                        <ResponsiveDialog onConfirm={handleConfirm} onCancel={handleCancel} />
                                                                    </>

                                                                }
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Enter Page Details" className="ReactModal__Content" overlayClassName="ReactModal__Overlay"> <h2 className="modal-title">Enter Page Title</h2>
                                            <div className="modal-field">
                                                <label htmlFor="pageTitle">Page Title</label>
                                                <input id="pageTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Page Title" />
                                            </div>

                                            <div className="modal-field">
                                                <label htmlFor="linkAddress">Page Link</label>
                                                <input id="linkAddress" type="text" value={linkAddress} onChange={(e) => setLinkAddress(e.target.value)} placeholder="Enter Url" />
                                            </div>

                                            <div className="modal-field">
                                                <label htmlFor="seoTitle">SEO Title</label>
                                                <input id="seoTitle" type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="SEO Title" />
                                            </div>

                                            <div className="modal-field">
                                                <label htmlFor="metaDescription">Meta Description</label>
                                                <textarea id="metaDescription" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Meta Description" />
                                            </div>

                                            <div className="modal-field">
                                                <label htmlFor="keywords">Keywords</label>
                                                <input id="keywords" type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="Keywords (comma-separated)" />
                                            </div>


                                            <div className="modal-buttons">
                                                <button onClick={handleSave} className="modal-button modal-button-primary">Save Page</button>
                                                <button onClick={() => setIsModalOpen(false)} className="modal-button modal-button-secondary">Cancel</button>
                                            </div>
                                        </Modal>


                                    </>
                                    : showpage === "navbar" ?
                                        <>
                                            <div className="editor-header">
                                                <div className="title-container">
                                                    <h1 className="all-main-heading">Navigation Details</h1>
                                                </div>
                                                <div className="buttons-container">
                                                    <button onClick={handlenavigationpage} className="main-button">Change Navigation</button>
                                                </div>
                                            </div>

                                            {loading ? <p>Loading...</p> : (
                                                <table style={styles.table}>
                                                    <thead>
                                                        <tr>
                                                            <th className="all-para" style={styles.tableHeader}>S.No</th>
                                                            <th className="all-para" style={styles.tableHeader}>Title</th>
                                                            <th className="all-para" style={styles.tableHeader}>Link</th>
                                                            <th className="all-para" style={styles.tableHeader}>Position</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {navigationItems.map(item => (
                                                            <tr key={item.id}>
                                                                <td className="all-para" style={styles.tableCell}>{++sno}</td> {/* Increment the counter */}
                                                                <td className="all-para" style={styles.tableCell}>{item.title}</td>
                                                                <td className="all-para" style={styles.tableCell}>{item.urls}</td>
                                                                <td className="all-para" style={styles.tableCell}>{item.position}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </>

                                        : showpage === "blogs" ?
                                            <>
                                                <div className="editor-header my-5">
                                                    <div className="title-container">
                                                        <h1 className="all-main-heading">Blogs Settings</h1>
                                                    </div>
                                                    <div className="buttons-container">
                                                        <button onClick={handleblogs} className="main-button">Add More Blogs</button>
                                                    </div>
                                                </div>

                                                {loading ? <p>Loading...</p> : (
                                                    <table style={styles.table}>
                                                        <thead>
                                                            <tr>
                                                                <th className="all-para" style={styles.tableHeader}>S.No</th>
                                                                <th className="all-para" style={styles.tableHeader}>Blog Title</th>
                                                                <th className="all-para" style={styles.tableHeader}>Blog Description</th>
                                                                <th className="all-para" style={styles.tableHeader}>Blog Url</th>
                                                                <th className="all-para" style={styles.tableHeader}>Blog Date</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {blogsItems.map(item => (
                                                                <tr key={item.id}>
                                                                    <td className="all-para" style={styles.tableCell}>{++sno1}</td> {/* Increment the counter */}

                                                                    <td className="all-para" style={styles.tableCell}>{item.title}</td>
                                                                    <td className="all-para" style={styles.tableCell}>{item.content}</td>
                                                                    <td className="all-para" style={styles.tableCell}>/{item.url}</td>
                                                                    <td className="all-para" style={styles.tableCell}>{item.date}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </>
                                            : showpage == "recyclebin" ?
                                                <div>
                                                    {loading ? <p>Loading...</p> : (
                                                        <table style={styles.table}>
                                                            <thead>
                                                                <tr>
                                                                    <th style={styles.tableHeader}>S.No</th>
                                                                    <th style={styles.tableHeader}>Title</th>
                                                                    <th style={styles.tableHeader}>SEO Title</th>
                                                                    <th style={styles.tableHeader}>SEO Meta Description</th>
                                                                    <th style={styles.tableHeader}>Link Address</th>
                                                                    <th style={styles.tableHeader}>Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {getoffpages.map(item => (
                                                                    <tr key={item.id}>
                                                                        <td style={styles.tableCell}>{1}</td>
                                                                        <td style={styles.tableCell}>{item.title}</td>
                                                                        <td style={styles.tableCell}>{item.seoTitle}</td>
                                                                        <td style={styles.tableCell}>{item.metaDescription}</td>
                                                                        <td style={styles.tableCell}>{item.linkAddress}</td>
                                                                        <td style={styles.tableCell}>
                                                                            <button className="btn btn-success mx-2" target="_blank"
                                                                                onClick={() => handleAddPage(item.id)}
                                                                            >Add Page</button>

                                                                            {selectedPagenewId === item.id && is_confirmModalOpen &&
                                                                                <>
                                                                                    <ResponsiveDialog onConfirm={handleConfirm} onCancel={handleCancel} />
                                                                                </>

                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    )}

                                                </div>

                                                : showpage === "Faq" ?
                                                    <>
                                                        <div className="editor-header">
                                                            <div className="title-container">
                                                                <h1 className="all-main-heading">FAQs Settings</h1>
                                                            </div>
                                                            <div className="buttons-container">
                                                                <button onClick={handlefaqs} className="main-button">Change FAQ</button>
                                                            </div>
                                                        </div>

                                                        {loading ? <p>Loading...</p> : (
                                                            <table style={styles.table}>
                                                                <thead>
                                                                    <tr>
                                                                        <th className="all-para" style={styles.tableHeader}>S.No</th>

                                                                        <th className="all-para" style={styles.tableHeader}>FAQ Title</th>
                                                                        <th className="all-para" style={styles.tableHeader}>FAQ Answer</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {faqItems.map(item => (
                                                                        <tr key={item.id}>
                                                                            <td className="all-para" style={styles.tableCell}>{++sno2}</td> {/* Increment the counter */}

                                                                            <td className="all-para" style={styles.tableCell}>{item.question}</td>
                                                                            <td className="all-para" style={styles.tableCell}>{item.answer}</td>

                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        )}
                                                    </>

                                                    : showpage === "team" ?
                                                        <>
                                                            <div className="editor-header">
                                                                <div className="title-container">
                                                                    <h1 className="all-main-heading">Our Team Settings</h1>
                                                                </div>
                                                                <div className="buttons-container">
                                                                    <button onClick={handleteams} className="main-button">Change Team Members</button>
                                                                </div>
                                                            </div>

                                                            {loading ? <p>Loading...</p> : (
                                                                <table style={styles.table}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="all-para" style={styles.tableHeader}>S.No</th>
                                                                            <th className="all-para" style={styles.tableHeader}>Team Member Name</th>
                                                                            <th className="all-para" style={styles.tableHeader}>Image</th>
                                                                            <th className="all-para" style={styles.tableHeader}>Designation</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {teamItems.map(item => (
                                                                            <tr key={item.id}>
                                                                                <td className="all-para" style={styles.tableCell}>{++sno3}</td> {/* Increment the counter */}
                                                                                <td className="all-para" style={styles.tableCell}>{item.name}</td>
                                                                                <td className="all-para" style={styles.tableCell}><img src={`uploads/${item.photo}`} alt={`Photo of ${item.name}`} width="50" /></td>
                                                                                <td className="all-para" style={styles.tableCell}>{item.designation}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            )}

                                                        </>
                                                        : showpage === "testimonials" ?
                                                            <>
                                                                <div className="editor-header my-5">
                                                                    <div className="title-container">
                                                                        <h1 className="all-main-heading">Our Testimonial Settings</h1>
                                                                    </div>
                                                                    <div className="buttons-container">
                                                                        <button onClick={handletests} className="main-button">Add More Testimonials</button>
                                                                    </div>
                                                                </div>

                                                                {loading ? <p>Loading...</p> : (
                                                                    <table style={styles.table}>
                                                                        <thead>
                                                                            <tr>
                                                                                <th className="all-para" style={styles.tableHeader}>S.No</th>

                                                                                <th className="all-para" style={styles.tableHeader}>Reviewer Name</th>
                                                                                <th className="all-para" style={styles.tableHeader}>Review</th>
                                                                                <th className="all-para" style={styles.tableHeader}>Rating</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {testimonialItems.map(item => (
                                                                                <tr key={item.TID}>
                                                                                    <td className="all-para" style={styles.tableCell}>{++sno4}</td> {/* Increment the counter */}

                                                                                    <td className="all-para" style={styles.tableCell}>{item.Name}</td>
                                                                                    <td className="all-para" style={styles.tableCell}>{item.Review}</td>
                                                                                    <td className="all-para" style={styles.tableCell}>{item.Star}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                    </table>
                                                                )}
                                                            </>
                                                            :
                                                            showpage === "Mortage" ?
                                                                <>
                                                                    <div style={{ width: "100%", padding: "0px" }}>
                                                                        <MortagageService />
                                                                    </div>
                                                                </>
                                                                :
                                                                showpage === "Home" ?
                                                                    <>
                                                                        <AdminHome />
                                                                    </>
                                                                    :
                                                                    showpage === "footer" ?
                                                                        <>
                                                                            <FooterSettingsForm />
                                                                        </>
                                                                        : showpage === "dash" ?
                                                                            <>
                                                                                <AdminDashboard />
                                                                            </>
                                                                            : showpage === "newdevelop" ?
                                                                                <>
                                                                                    <NewDevelop />
                                                                                </>
                                                                                :
                                                                                null
                            }
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
    blogdesc: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px',
        textAlign: 'left',


        whiteSpace: "nowrap",
        overFlow: "hidden",
        textOverflow: 'ellipsis'

    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
};

function ResponsiveDialog({ onConfirm, onCancel }) {
    return (
        <>
            <div className="my-5">
                <h6 className="text-center my-3" style={{ color: "red" }}>Do Yoy Want To Delete</h6>
                <div className="" style={{ display: "inline-flex", justifyContent: "center" }}>
                    <button className="btn btn-warning mx-5" onClick={onCancel}>Cancel</button>
                    <button className="btn btn-danger" onClick={onConfirm} autoFocus>Confirm</button>
                </div>
            </div>
        </>
    );
}


const PageList = ({ onSelectPage }) => {
    const [htmlduplicate, sethtmlduplicate] = useState([]);
    const [cssduplicate, setcssduplicate] = useState([]);
    const [codeforduplicate, setcodeforduplicate] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [seoTitle, setSeoTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [linkAddress, setLinkAddress] = useState('');
    const [pages, setPages] = useState([]);
    const [is_confirmModalOpen, setis_confirmModalOpen] = useState(false);
    const [selectedPageId, setSelectedPageId] = useState(null);

    const openModal = (pageId) => {
        setSelectedPageId(pageId);
        setis_confirmModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPageId(null);
        setis_confirmModalOpen(false);
    };

    const handleConfirm = async () => {
        closeModal();
        // Call the delete function after confirmation
        handleDelete(selectedPageId);
    };

    const handleCancel = () => {
        // Handle the action when the user cancels
        alert('Cancelled!');
        closeModal();
    };

    useEffect(() => {
    }, [is_confirmModalOpen])

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = () => {
        fetch('http://localhost:4000/api/pages')
            .then(response => response.json())
            .then(data => setPages(data))
            .catch(error => console.error('Error fetching pages:', error));
    };

    const handleDelete = (pageId) => {
        // Replace this with your actual delete logic
        fetch(`http://localhost:4000/api/pages/${pageId}`, { method: 'DELETE' })
            .then(() => {
                alert('Page deleted successfully!');
                // Add any additional logic after successful deletion
            })
            .catch(error => console.error('Error deleting page:', error));
    };

    const handleDuplicate = (pageId) => {
        setIsModalOpen(true);
        axios.get(`http://localhost:4000/api/pages/${pageId}`).then((res) => {
            const { fileContent, cssfile, result } = res.data;
            console.log("fileContent", fileContent);
            sethtmlduplicate(fileContent);
            setcssduplicate(cssfile);
        })

    };


    const handleSave = () => {

        const html = htmlduplicate;
        const css = cssduplicate;
        const pageVal = "pages";

        const url = 'http://localhost:4000/api/save-page';
        const method = 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, html, css, linkAddress, seoTitle, metaDescription, keywords, pageVal }),
        })
            .then(response => response.json())
            .then(data => {


                alert('Page saved successfully!');
                setIsModalOpen(false);
                setTitle(title);
                setLinkAddress(linkAddress);
                setSeoTitle(seoTitle);
                setMetaDescription(metaDescription);
                setKeywords(keywords);
                // Handle any post-save actions
            })
            .catch(error => {
                console.error('Error saving page:', error);
            });


    };


    return (

        <>

            <table style={styles.table} className="table-responsive table-striped table-bordered display all-para my-5" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th className="all-para" style={styles.tableHeader}>S.No</th>
                        <th className="all-para" style={styles.tableHeader}>Title</th>
                        <th className="all-para" style={styles.tableHeader}>SEO Title</th>
                        <th className="all-para" style={styles.tableHeader}>SEO Meta Description</th>
                        <th className="all-para" style={styles.tableHeader}>Link Address</th>
                        <th className="all-para" style={styles.tableHeader}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pages.map((page, index) => (
                        <tr key={page.id}>
                            <td className="all-para" style={styles.tableCell}>{index + 1}</td>
                            <td className="all-para" style={styles.tableCell}>{page.title}</td>
                            <td className="all-para" style={styles.tableCell}>{page.seoTitle}</td>
                            <td className="all-para" style={styles.tableCell}>{page.metaDescription}</td>
                            <td className="all-para" style={styles.tableCell}>{page.linkAddress}</td>
                            <td className="all-para" style={styles.tableCell}>
                                <a target="_blank" textDecoration="none">   <button className="btn btn-success mx-2" target="_blank" onClick={() => handleDuplicate(page.id)}>Copy page</button>
                                </a>
                                <a target="_blank" textDecoration="none">
                                    <button className="btn btn-success mx-2" onClick={() => onSelectPage(page.id)}>Edit</button>
                                </a>
                                <button className="btn btn-danger" target="_blank" onClick={() => openModal(page.id)}>Delete</button>
                                {selectedPageId == page.id && is_confirmModalOpen &&
                                    <>
                                        <ResponsiveDialog onConfirm={handleConfirm} onCancel={handleCancel} />
                                    </>

                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Enter Page Details"
                className="ReactModal__Content"
                overlayClassName="ReactModal__Overlay"
            >
                <h2 className="modal-title all-main-heading" >Enter Page Title</h2>
                <div className="modal-field">
                    <label className="all-sub-heading" htmlFor="pageTitle">Page Title</label>
                    <input
                        className="all-para"
                        id="pageTitle"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Page Title"
                    />
                </div>

                <div className="modal-field">
                    <label className="all-sub-heading" htmlFor="linkAddress">Page Link</label>
                    <input
                        className="all-para"
                        id="linkAddress"
                        type="text"
                        value={linkAddress}
                        onChange={(e) => setLinkAddress(e.target.value)}
                        placeholder="Enter Url"
                    />
                </div>


                <div className="modal-field">
                    <label className="all-sub-heading" htmlFor="seoTitle">SEO Title</label>
                    <input
                        className="all-para"
                        id="seoTitle"
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder="SEO Title"
                    />
                </div>

                <div className="modal-field">
                    <label className="all-sub-heading" htmlFor="metaDescription">Meta Description</label>
                    <textarea
                        id="metaDescription"
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="Meta Description"
                    />
                </div>

                <div className="modal-field">
                    <label className="all-sub-heading" htmlFor="keywords">Keywords</label>
                    <input
                        className="all-para"
                        id="keywords"
                        type="text"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="Keywords (comma-separated)"
                    />
                </div>


                <div className="modal-buttons">
                    <button onClick={handleSave} className="modal-button modal-button-primary">Save Page</button>
                    <button onClick={() => setIsModalOpen(false)} className="modal-button modal-button-secondary">Cancel</button>
                </div>
            </Modal>
        </>
    )
}

export default App;

