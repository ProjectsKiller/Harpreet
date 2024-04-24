SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

CREATE DATABASE `raine&horneProperties`;

USE `raine&horneProperties`;

DROP TABLE IF EXISTS `BasicPropertiesDetails`;

CREATE TABLE IF NOT EXISTS `BasicPropertiesDetails` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `Ad_Type` VARCHAR(255) DEFAULT NULL,
  `count` VARCHAR(255) DEFAULT NULL,
  `Property_Name` VARCHAR(255) DEFAULT NULL,
  `Property_Title` VARCHAR(255) DEFAULT NULL,
  `Bedrooms` VARCHAR(255) DEFAULT NULL,
  `No_of_Bathroom` VARCHAR(255) DEFAULT NULL,
  `No_of_Rooms` VARCHAR(255) DEFAULT NULL,
  `Parking` VARCHAR(255) DEFAULT NULL,
  `Price` VARCHAR(255) DEFAULT NULL,
  `off_plan` VARCHAR(255) DEFAULT NULL
);

DROP TABLE IF EXISTS `PropertyLocation`;

CREATE TABLE IF NOT EXISTS `PropertyLocation` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` VARCHAR(255) DEFAULT NULL,
  `Latitude` VARCHAR(255) DEFAULT NULL,
  `Longitude` VARCHAR(255) DEFAULT NULL
);


DROP TABLE IF EXISTS `traffic`;
CREATE TABLE IF NOT EXISTS `traffic` (
  `ID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` VARCHAR(255) DEFAULT NULL
);


DROP TABLE IF EXISTS `ListingAgent`;

CREATE TABLE IF NOT EXISTS `ListingAgent` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` VARCHAR(255) DEFAULT NULL,
  `Listing_Agent` VARCHAR(255) DEFAULT NULL,
  `Listing_Agent_Email` VARCHAR(255) DEFAULT NULL,
  `Listing_Date` VARCHAR(255) DEFAULT NULL,
  `Last_Updated` VARCHAR(255) DEFAULT NULL,
  `completion_status` VARCHAR(255) DEFAULT NULL,
  `permit_number` VARCHAR(255) DEFAULT NULL,
  `Property_Ref_No` VARCHAR(255) DEFAULT NULL
);

DROP TABLE IF EXISTS `UnitDetails`;

CREATE TABLE IF NOT EXISTS `UnitDetails` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` VARCHAR(255) DEFAULT NULL,
  `Unit_Type` VARCHAR(255) DEFAULT NULL,
  `Unit_Reference_No` VARCHAR(255) DEFAULT NULL,
  `Unit_Model` VARCHAR(255) DEFAULT NULL,
  `Unit_Builtup_Area` VARCHAR(255) DEFAULT NULL,
  `Plot_Area` VARCHAR(255) DEFAULT NULL,
  `unit_measure` VARCHAR(255) DEFAULT NULL
);

DROP TABLE IF EXISTS `WebRemarks`;

CREATE TABLE IF NOT EXISTS `WebRemarks` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` VARCHAR(255) DEFAULT NULL,
  `Property_Name` VARCHAR(255) DEFAULT NULL,
  `Web_Remarks` LONGTEXT DEFAULT NULL
);

DROP TABLE IF EXISTS `PropertyArea`;
CREATE TABLE IF NOT EXISTS `PropertyArea` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` VARCHAR(255) DEFAULT NULL,
  `Community` VARCHAR(255) DEFAULT NULL,
  `Emirate` VARCHAR(255) DEFAULT NULL,
  `Primary_View` VARCHAR(255) DEFAULT NULL,
  `Audio_Tour` VARCHAR(50) DEFAULT NULL,
  `PreviewLink` VARCHAR(255) DEFAULT NULL,
  `virtual_Tour` VARCHAR(255) DEFAULT NULL,
  `Web_Tour` VARCHAR(255) DEFAULT NULL,
  `Threesixty_Tour` VARCHAR(255) DEFAULT NULL
);

DROP TABLE IF EXISTS `Facilities`;

CREATE TABLE IF NOT EXISTS `Facilities` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` varchar(30) DEFAULT NULL,
  `Facilities` json DEFAULT NULL
);

DROP TABLE IF EXISTS `PropertiesImages`;

CREATE TABLE IF NOT EXISTS `PropertiesImages` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` VARCHAR(255) DEFAULT NULL,
  `Imagelink` json DEFAULT NULL
);

DROP TABLE IF EXISTS `OtherImpData`;

CREATE TABLE IF NOT EXISTS `OtherImpData` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` VARCHAR(255) DEFAULT NULL,
  `Cheques` VARCHAR(255) DEFAULT NULL,
  `Exclusive` VARCHAR(255) DEFAULT NULL,
  `Featured` VARCHAR(255) DEFAULT NULL,
  `Fitted` VARCHAR(255) DEFAULT NULL,
  `Strno` VARCHAR(255) DEFAULT NULL,
  `company_logo` VARCHAR(255) DEFAULT NULL,
  `company_name` VARCHAR(255) DEFAULT NULL,
  `QR_Code` INT DEFAULT NULL,
  `price_on_application` VARCHAR(255) DEFAULT NULL
);

DROP TABLE IF EXISTS `OtherImpData`;
DROP TABLE IF EXISTS `UserInfo`;
CREATE TABLE IF NOT EXISTS `UserInfo` (
  `Uid` INT AUTO_INCREMENT PRIMARY KEY,
  `Name` VARCHAR(255) DEFAULT NULL,
  `Email` VARCHAR(255) DEFAULT NULL,
  `Phone` VARCHAR(255) DEFAULT NULL,
  `ListingType` VARCHAR(255) DEFAULT NULL,
  `PropertyAddress` VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `SubscribeEmails` (
  `ID` INT AUTO_INCREMENT PRIMARY KEY,
  `Email` VARCHAR(255) DEFAULT NULL

);

DROP TABLE IF EXISTS `Ourteam`;

CREATE TABLE IF NOT EXISTS `Ourteam` (
  ID INT AUTO_INCREMENT PRIMARY KEY,
 Name  VARCHAR(255) DEFAULT NULL,
  Job VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL
);

INSERT INTO `Ourteam` (ID, Name, Job, email, image) VALUES
(5, 'SANJAY CHIMNANI', 'Managing Director', 'sanjay.chimnani@rhdubai.ae', '1698329391221.jpg'),
(6, 'AKHIL CHIMNANI', 'Vice President', 'akhil.chimnani@rhdubai.ae', '1698329510823.jpg'),
(9, 'ABDUL MUTAAL', 'Real Estate Agent', 'abdul.mutaal@rhdubai.ae', '1698329763283.png'),
(38, 'ABHISHEK KANDALKAR', 'Real Estate Agent', 'abhishek.kandalkar@rhdubai.ae', NULL),
(39, 'BRUNO KRISTINS', 'Real Estate Agent', 'bruno.kristins@rhdubai.ae', NULL),
(12, 'MANISHA SHARMA', 'Real Estate Agent', 'manisha.sharma@rhdubai.ae', '1698329894375.png'),
(40, 'MEGAN BADENHORST', 'Real Estate Agent', 'megan.badenhorst@rhdubai.ae', NULL),
(14, 'RANIA PETTON', 'Real Estate Agent', 'rania.petton@rhdubai.ae', '1698330019152.png'),
(15, 'REEMA JUDITH', 'Real Estate Agent', 'reema.judith@rhdubai.ae', '1698330054414.png'),
(41, 'SAGAR ADHIKARI', 'Real Estate Agent', 'sagar.adhikari@rhdubai.ae', NULL),
(42, 'VIDHI JAWA KHANNA', 'Real Estate Agent', 'vidhi.khanna@rhdubai.ae', NULL),
(20, 'CHARLENA PIENCENAVES', 'Operations Administrator', 'charlena.piencenaves@rhdubai.ae', '1698330297470.png'),
(21, 'ROSEMARIE FERRER', 'Property Coordinator', 'rosemarie.ferrer@rhdubai.ae', '1698330367664.png'),
(43, 'PRINCESS MARCELINO', 'Admin Assistant', 'princess.marcelino@rhdubai.ae', NULL),
(23, 'SANJANA CHIMNANI', 'Managing Director', 'sanjay.chimnani@rhdubai.ae', '1698330555305.jpg'),
(44, 'KIRAN KURIAN', 'Accounts Manager', 'kiran.kurian@rhdubai.ae', NULL),
(25, 'DENCIL EVEREST', 'Assistant Accountant', 'dencil.everest@rhdubai.ae', '1698330650057.jpg'),
(45, 'NEHA GUPTA', 'Revenue Manager', 'neha.gupta@rhdubai.ae', NULL),
(27, 'THOMSON DMELLO', 'Operations Manager', 'thomson.dmello@rhdubai.ae', '1698330713141.png'),
(46, 'SONALI PATIL', 'Guest Relations Officer', 'sonali.patil@rhdubai.ae', NULL),
(29, 'MANISHA THAKUR', 'Guest Relations Officer', 'manisha.thakur@rhdubai.ae', '1698330798873.png'),
(47, 'UMMAR FAROOK KOLIYAD ABDULKHADER', 'Guest Relations Officer', 'ummar.farook@rhdubai.ae', NULL),
(48, 'RINUMON THOMAS', 'Storekeeper', 'rinumon.thomas@rhdubai.ae', NULL),
(49, 'JONIN MARIE GARGOLES', 'Holiday Homes Administrator', 'jonin.gargoles@rhdubai.ae', NULL),
(34, 'MELISSA MENDOZA', 'Holiday Homes Administrator', 'admin@rhdubai.ae', '1698330986432.png'),
(35, 'MAYBELYN BAGO', 'Holiday Homes Administrator', 'maybelyn.bago@rhdubai.ae', '1698331024679.png'),
(37, 'NICHOLAS BATEMAN BULL', 'Sales Manager', 'nicholas.bull@rhdubai.ae', NULL);


-- **********************Admin*******************************

DROP TABLE IF EXISTS `whyuspagedb`;
CREATE TABLE `whyuspagedb` (
  `ID` INT AUTO_INCREMENT PRIMARY KEY,
  `sec1bgimage` text NOT NULL,
  `sec1heading` text NOT NULL,
  `sec1discription` text NOT NULL,
  `sec2heading` text NOT NULL,
  `sec2icon` text NOT NULL,
  `sec2iconheading` text NOT NULL,
  `sec2icondiscription` text NOT NULL,
  `sec2icon2` text NOT NULL,
  `sec2iconheading2` text NOT NULL,
  `sec2icondiscription2` text NOT NULL,
  `sec2icon3` text NOT NULL,
  `sec2iconheading3` text NOT NULL,
  `sec2icondiscription3` text NOT NULL,
  `sec2icon4` text NOT NULL,
  `sec2iconheading4` text NOT NULL,
  `sec2icondiscription4` text NOT NULL,
  `sec2icon5` text NOT NULL,
  `sec2iconheading5` text NOT NULL,
  `sec2icondiscription5` text NOT NULL,
  `sec2icon6` text NOT NULL,
  `sec2iconheading6` text NOT NULL,
  `sec2icondiscription6` text NOT NULL,
  `sec2icon7` text NOT NULL,
  `sec2iconheading7` text NOT NULL,
  `sec2icondiscription7` text NOT NULL
);


INSERT INTO `whyuspagedb` (`ID`, `sec1bgimage`, `sec1heading`, `sec1discription`,
 `sec2heading`, 
 `sec2icon` , `sec2iconheading` , `sec2icondiscription`,
 `sec2icon2` , `sec2iconheading2` , `sec2icondiscription2` , 
 `sec2icon3`,`sec2iconheading3` , `sec2icondiscription3` ,
 `sec2icon4` , `sec2iconheading4`  , `sec2icondiscription4` , 
 `sec2icon5`,  `sec2iconheading5` , `sec2icondiscription5`,
 `sec2icon6` ,`sec2iconheading6` , `sec2icondiscription6`, 
 `sec2icon7`,`sec2iconheading7` ,`sec2icondiscription7`) VALUES
 (1,'https://www.rhdubai.ae/static/media/whyusban.bad210b8a648bb6cc892.png' ,  'Why Us', 'Raine & Horne Dubai provides a range of real estate services, including residential and commercial sales and leasing, property research , property and asset management, and project and land marketing.',
  'What We Offer' ,
 'https://www.rhdubai.ae/images/person.png' , 'Experience', "Since its establishment in 1883, Raine & Horne has adhered to business practices that focus on the company's total commitment to personalized service and meeting clients' property needs across sales, leasing, management, and consulting services for all types of property. The company has experienced considerable growth over the years, enjoying strong success through peaks and troughs in the market." ,
 "https://www.rhdubai.ae/images/network.png",'National and International Network:', "Raine & Horne boasts a network of over 450 offices throughout Australia and around the world. The Dubai office was opened in 2015, highlighting the importance of the region for the brand, with access to the collective strength and comprehensive resources of the Raine & Horne network. Our Dubai and Ras Al Khaimah-based teams have specialized knowledge and advice regarding local trends and market conditions, using a variety of digital tools, resources, and experience.",
 'https://www.rhdubai.ae/images/reputation.png' ,'Reputation', 'When selling with Raine & Horne, the service provided does not begin or end at geographical borders, and properties can be marketed locally, regionally, nationally, or internationally. Our reputation and goodwill are said to be unequalled in the industry, which is a result of our dedication to providing a consistent, professional, and personalized service across all aspects of real estate.', 
 'https://www.rhdubai.ae/images/service.png','Full Service Network:','Raine & Horne Dubai provides a comprehensive real estate service consisting of sales, leasing, management, short-term rental, and consulting. The vast resources available in our local and international network ensure clients benefit from on-the-spot knowledge of local trends and market conditions.' ,
 'https://www.rhdubai.ae/images/education.png','Educated Professionals:',"To maintain our reputation as one of the industry's premier real estate brands, our property consultants participate in regular training. Our consultants have a collective 100 years of experience in the Middle East property market and take pride in having area expertise.",
 'https://www.rhdubai.ae/images/tech.png','Technology & Marketing:','Our website is well-designed with easy-to-use search functions. We also deploy proprietary marketing technology that offers localized, hyper-targeted lead generation marketing campaigns, ensuring that your property will be seen by interested and qualified buyers.',
 'https://www.rhdubai.ae/images/ethics.png','Ethical:', 'Being a family company, conducting business ethically is a core part of our ethos. We are proud of our integrity and honesty and do not compromise on our high ethical standards that are ingrained into the culture of the Raine & Horne network.' );


 CREATE TABLE `ourteampagedb` (
     `ID` INT AUTO_INCREMENT PRIMARY KEY,
  `sec1bgimage` text NOT NULL,
  `sec1heading` text NOT NULL,
  `sec1discription` text NOT NULL,
  `sec2heading` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
COMMIT;



INSERT INTO `ourteampagedb` (ID, sec1bgimage, sec1heading, sec1discription, sec2heading) VALUES
(1, 'SANJAY CHIMNANI', 'Managing Director', 'sanjay.chimnani@rhdubai.ae', 'dffggd');