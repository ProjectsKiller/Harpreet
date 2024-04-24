SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE `raine&horneProperties`;
USE `raine&horneProperties`;

DROP TABLE IF EXISTS `BasicPropertiesDetails`;
CREATE TABLE IF NOT EXISTS `BasicPropertiesDetails` (
   `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `Ad_Type` VARCHAR(255)  DEFAULT NULL,
  `count` VARCHAR(255)  DEFAULT NULL,
  `Property_Name` VARCHAR(255)  DEFAULT NULL,
  `Property_Title` VARCHAR(255)  DEFAULT NULL,
  `Bedrooms`  VARCHAR(255)  DEFAULT NULL,
  `No_of_Bathroom`  VARCHAR(255)  DEFAULT NULL,
  `No_of_Rooms`  VARCHAR(255)  DEFAULT NULL,
  `Parking` VARCHAR(255)  DEFAULT NULL,
  `Price`  VARCHAR(255)  DEFAULT NULL,
  `off_plan` VARCHAR(255)  DEFAULT NULL
);


DROP TABLE IF EXISTS `PropertyLocation`;
CREATE TABLE IF NOT EXISTS `PropertyLocation` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
   `count` VARCHAR(255)  DEFAULT NULL,
   `Latitude` VARCHAR(255)  DEFAULT NULL,
  `Longitude` VARCHAR(255)  DEFAULT NULL
);


DROP TABLE IF EXISTS `ListingAgent`;
CREATE TABLE IF NOT EXISTS `ListingAgent` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` VARCHAR(255)  DEFAULT NULL,
  `Listing_Agent` VARCHAR(255)  DEFAULT NULL,
  `Listing_Agent_Email` VARCHAR(255)  DEFAULT NULL,
  `Listing_Date` VARCHAR(255)  DEFAULT NULL,
  `Last_Updated` VARCHAR(255)  DEFAULT NULL,
  `completion_status` VARCHAR(255)  DEFAULT NULL,
  `permit_number` VARCHAR(255)  DEFAULT NULL,
  `Property_Ref_No` VARCHAR(255)  DEFAULT NULL
);

DROP TABLE IF EXISTS `UnitDetails`;
CREATE TABLE IF NOT EXISTS `UnitDetails` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
   `count` VARCHAR(255)  DEFAULT NULL,
  `Unit_Type` VARCHAR(255)  DEFAULT NULL,
  `Unit_Reference_No` VARCHAR(255)  DEFAULT NULL,
  `Unit_Model` VARCHAR(255)  DEFAULT NULL,
  `Unit_Builtup_Area` VARCHAR(255)  DEFAULT NULL,
  `Plot_Area` VARCHAR(255)  DEFAULT NULL,
  `unit_measure` VARCHAR(255)  DEFAULT NULL
);

DROP TABLE IF EXISTS `WebRemarks`;
CREATE TABLE IF NOT EXISTS `WebRemarks` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` VARCHAR(255)  DEFAULT NULL,
  `Property_Name` VARCHAR(255)  DEFAULT NULL,
  `Web_Remarks` LONGTEXT  DEFAULT NULL
);
DROP TABLE IF EXISTS `PropertyArea`;
CREATE TABLE IF NOT EXISTS `PropertyArea` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
   `count` VARCHAR(255)  DEFAULT NULL,
  `Community` VARCHAR(255)  DEFAULT NULL,
  `Emirate` VARCHAR(255)  DEFAULT NULL,
  `Primary_View` VARCHAR(255)  DEFAULT NULL,
  `Audio_Tour` VARCHAR(50)  DEFAULT NULL,
  `PreviewLink` VARCHAR(255)  DEFAULT NULL,
  `virtual_Tour` VARCHAR(255)  DEFAULT NULL,
  `Web_Tour` VARCHAR(255)  DEFAULT NULL,
  `Threesixty_Tour` VARCHAR(255)  DEFAULT NULL
);

DROP TABLE IF EXISTS `Facilities`;
CREATE TABLE IF NOT EXISTS `Facilities` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
   `count` VARCHAR(255)  DEFAULT NULL,
  `Facility` VARCHAR(50)  DEFAULT NULL
);

DROP TABLE IF EXISTS `PropertiesImages`;
CREATE TABLE IF NOT EXISTS `PropertiesImages` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
   `count` VARCHAR(255)  DEFAULT NULL,
  `Imagelink` VARCHAR(50)  DEFAULT NULL
);

DROP TABLE IF EXISTS `OtherImpData`;
CREATE TABLE IF NOT EXISTS `OtherImpData` (
  `PropertyID` INT AUTO_INCREMENT PRIMARY KEY,
  `count` VARCHAR(255)  DEFAULT NULL,
  `Cheques` VARCHAR(255)  DEFAULT NULL,
  `Exclusive` VARCHAR(255)  DEFAULT NULL,
  `Featured` VARCHAR(255)  DEFAULT NULL,
  `Fitted` VARCHAR(255)  DEFAULT NULL,
  `Strno` VARCHAR(255)  DEFAULT NULL,
  `company_logo` VARCHAR(255)  DEFAULT NULL,
  `company_name` VARCHAR(255)  DEFAULT NULL,
   `QR_Code` INT  DEFAULT NULL,
  `price_on_application` VARCHAR(255)  DEFAULT NULL
);
CREATE TABLE IF NOT EXISTS `SubscribeEmails` (
  `ID` INT AUTO_INCREMENT PRIMARY KEY,
  `Email` VARCHAR(255) DEFAULT NULL

);
CREATE TABLE IF NOT EXISTS `UserInfo` (
  `Uid` INT AUTO_INCREMENT PRIMARY KEY,
  `Name` VARCHAR(255) DEFAULT NULL,
  `Email` VARCHAR(255) DEFAULT NULL,
  `Phone` VARCHAR(255) DEFAULT NULL,
  `ListingType` VARCHAR(255) DEFAULT NULL,
  `PropertyAddress` VARCHAR(255) DEFAULT NULL
);
-- function search(e) {
--       const data = e.target.value
--       const val = Data.filter(Data => Data.Name.toLowerCase().includes(data)
--           || Data.Query_Date.toLowerCase().includes(data)
--           || Data.Source.toLowerCase().includes(data))
--       console.log(val);
--       setdata(val)
--       if (data === '') {
--           Admissionquery()
--       }
--   }