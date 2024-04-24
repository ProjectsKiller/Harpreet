require('dotenv').config();
const express = require("express");
const { v4: uuidv4 } = require('uuid');

const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const multer = require("multer");
const xml2js = require("xml2js");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const path1 = path.join(__dirname, "/public/uploads");
const cookieParser = require("cookie-parser");
app.use(express.json({ limit: '999mb' }));
app.use(express.urlencoded({ limit: '999mb', extended: true }));
const cron = require("node-cron");
app.use(bodyParser.json());
const compression = require("compression");
const { log } = require("console");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
const userid = process.env.MYHOST
app.use(express.static('public'));
const nodemailer = require('nodemailer');
const { RssFeed, DataArray } = require('@mui/icons-material');
const port = 4000;

// *****************Server Connection*******************//
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from your React app
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  headers: 'Origin, X-Requested-With, Content-Type, Accept',
}));

// *****************DB Connection*******************//
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  maxPacketSize: 500 * 1024 * 1024,
  database: 'rainehorneProperties'
});


const envVar = process.env.PASS
var imagename = "";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path1);
  },
  filename: (req, file, cb) => {
    imagename = Date.now() + path.extname(file.originalname) + "";
    cb(null, imagename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "application/pdf") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

//CREATE CHAT
app.get('/createchat', async (req, res) => {

  const member1 = "mem1";
  const member2 = uuidv4(); // Generate a unique member2

  const selectQuery = 'SELECT * FROM chatdata';
  connection.query(selectQuery, (err, out1) => {
    if (err) throw err;

    if (out1.length === 0) {
      // If no rows are found, insert both member1 and member2
      const insertQuery = 'INSERT INTO chatdata (member1, member2) VALUES (?, ?)';
      connection.query(insertQuery, [member1, member2], (err, result) => {
        if (err) throw err;

        res.send("Inserted member1 and member2");
      });
    } else {
      const existingMember2 = out1[0].member2;

      if (existingMember2 === member2) {
        // Regenerate a unique member2 if it already exists
        return res.redirect('/createchat');
      } else {
        // Insert the unique member2 and member1
        const insertQuery = 'INSERT INTO chatdata (member1, member2) VALUES (?, ?)';
        connection.query(insertQuery, [member1, member2], (err, result) => {
          if (err) throw err;

          res.status(200).json(member2);
        });
      }
    }
  });
});
app.get('/fecthoffpage', (req, res) => {
  const sql = 'select * from newpropertiestable where type="off"';
  connection.query(sql, (err, result1) => {
    if (err) throw err;
    
    const SQL = 'select * from pages where type="off"';
    connection.query(SQL, (err, result2) => {
      if (err) throw err;

      let data = {
        combinedResults: [...result1, ...result2]
      };
      // Send the data as a JSON response
      res.json(data);
    });
  });
});
//GETCHAT
app.post("/getchat/:memberid", (req, res) => {
  const member1 = "mem1";
  const member2 = req.params.memberid;
  const sql=`select* from savechat where member1= ${member1} and member2=${member2}`;
  connection.query(sql,(err,results)=>{
    if(err) throw err;
     res.json(results);
  });
});


//SAVIG CHAT 
app.post("/savechat", (req, res) => {

  let data = {
    senderid: req.body.senderid,
    text: req.body.text
  };

  const sql = "INSERT INTO savechat SET ?";
  connection.query(sql, data, (err, results) => {
    if (err) throw err;
    console.log("Chat is saved");
    res.sendStatus(200);
  });
});


app.post('/traffic', (req, res) => {
  const number = req.body.count;
  console.log(number);

  const query = 'INSERT INTO traffic (count) VALUES (?)';

  connection.query(query, [number], (err, results) => {
    if (err) {
      console.error('Error inserting into traffic table:', err);
      res.status(500).send('Failed to insert into traffic table');
    } else {
      const selectQuery = 'SELECT * FROM traffic';
      connection.query(selectQuery, (err, results) => {
        if (err) {
          console.error('Error fetching records from traffic table:', err);
          res.status(500).send('Failed to fetch records from traffic table');
        } else {
          res.json(results);
        }
      });
    }
  });
});

app.get('/api/newpropertiespage', (req, res) => {
  const query = 'SELECT * FROM newpropertiestable WHERE type="on" ORDER BY created_at DESC'; // Adjust based on your actual table structure
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching pages:', err);
      res.status(500).send('Failed to fetch pages');
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/popupsubscribe", (req, res) => {
  console.log(req.body);
})
app.get("/api/data", async (req, res) => {
  try {
    const apiUrl =
      "https://xml.propspace.com/feed/xml.php?cl=3379&pid=8245&acc=8807"; // Replace with your API URL
    const response = await axios.get(apiUrl);
    xml2js.parseString(response.data, async (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // 'result' now contains the JSON representation of the XML data
      const FullData = result;
      const filterdata = FullData.Listings.Listing;
      if (Array.isArray(filterdata)) {
        for (const data of filterdata) {
          const sql = `SELECT * FROM basicpropertiesdetails WHERE count =?`;
          const values = [data.count];
          try {
            const results = await queryDatabase(sql, values);
            if (results.length === 0) {
              const insertSql = `INSERT INTO basicpropertiesdetails VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
              const insertValues = [
                data.Ad_Type,
                data.count,
                data.Property_Name,
                data.Property_Title,
                data.Bedrooms,
                data.No_of_Bathroom,
                data.No_of_Rooms,
                data.Parking,
                data.Price,
                data.off_plan,
              ];

              const results = await queryDatabase(insertSql, insertValues);
              if (results.affectedRows > 0) {
                const insertSql = `INSERT INTO ListingAgent VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const insertValues = [
                  data.count,
                  data.Listing_Agent,
                  data.Listing_Agent_Email,
                  data.Listing_Date,
                  data.Last_Updated,
                  data.completion_status,
                  data.permit_number,
                  data.Property_Ref_No,
                ];
                const results = await queryDatabase(insertSql, insertValues);
                if (results.affectedRows > 0) {
                  const insertSql = `INSERT INTO PropertyLocation VALUES (null, ?, ?, ?)`;
                  const insertValues = [
                    data.count,
                    data.Latitude,
                    data.Longitude,
                  ];
                  const results = await queryDatabase(insertSql, insertValues);
                  if (results.affectedRows > 0) {
                    const insertSql = ` INSERT INTO UnitDetails VALUES (null, ?, ?, ?, ?, ?, ? , ?)`;
                    const insertValues = [
                      data.count,
                      data.Unit_Type,
                      data.Unit_Reference_No,
                      data.Unit_Model,
                      data.Unit_Builtup_Area,
                      data.Plot_Area,
                      data.unit_measure,
                    ];
                    const results = await queryDatabase(
                      insertSql,
                      insertValues
                    );
                    if (results.affectedRows > 0) {
                      const insertSql = `INSERT INTO PropertyArea VALUES (null, ?, ?, ?, ?, ? , ?, ?, ? ,?)`;
                      const insertValues = [
                        data.count,
                        data.Community,
                        data.Emirate,
                        data.Primary_View,
                        data.Audio_Tour,
                        data.PreviewLink,
                        data.virtual_Tour,
                        data.Web_Tour,
                        data.Threesixty_Tour,
                      ];
                      const results = await queryDatabase(
                        insertSql,
                        insertValues
                      );

                      if (results.affectedRows > 0) {
                        const Facilities = data.Facilities;
                        const facilitiesArray = Facilities.map(
                          (item) => item.facility
                        );
                        const flattenedFacilitiesArray = facilitiesArray.flat();


                        const insertSql = `INSERT INTO Facilities (count, Facilities) VALUES (?, ?)`;
                        const insertValues = [
                          data.count,
                          JSON.stringify(flattenedFacilitiesArray),
                        ];
                        const results = await queryDatabase(
                          insertSql,
                          insertValues
                        );

                        if (results.affectedRows > 0) {
                          const insertSql = `INSERT INTO OtherImpData VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                          const insertValues = [
                            data.count,
                            data.Cheques,
                            data.Exclusive,
                            data.Featured,
                            data.Fitted,
                            data.Strno,
                            data.company_logo,
                            data.company_name,
                            data.QR_Code,
                            data.price_on_application,
                          ];
                          const results = await queryDatabase(
                            insertSql,
                            insertValues
                          );
                          if (results.affectedRows > 0) {
                            const Images = data.Images;

                            const imagesArray = Images.map((item) => item.image);
                            const flattenedImagesArray = imagesArray.flat();

                            const insertSql = `INSERT INTO PropertiesImages (count, Imagelink) VALUES (?, ?)`;
                            const insertValues = [data.count, JSON.stringify(flattenedImagesArray)];

                            const results = await queryDatabase(
                              insertSql,
                              insertValues
                            );

                            if (results.affectedRows > 0) {
                              const insertSql = `INSERT INTO WebRemarks VALUES (null, ?, ? , ?)`;
                              const insertValues = [
                                data.count,
                                data.Web_Remarks,
                                data.Property_Name,
                              ];
                              const results = await queryDatabase(
                                insertSql,
                                insertValues
                              );
                            } else {
                              console.log("PropertiesImages error");
                            }
                          } else {
                            console.log("OtherImpData error");
                          }
                        } else {
                          console.log("Facilities error");
                        }
                      } else {
                        console.log("PropertyArea error");
                      }
                    } else {
                      console.log("UnitDetails error");
                    }
                  } else {
                    console.log("PropertyLocation error");
                  }
                } else {
                  console.log("ListingAgent error");
                }
              } else {
                console.log("basicpropertiesdetails error");
              }
            } else {
              const sql = `UPDATE basicpropertiesdetails SET Ad_Type=?,count=? , Property_Name=?,Property_Title=?, Bedrooms=?, No_of_Bathroom=?, No_of_Rooms=?,
                            Parking=?, Price=?, off_plan=? WHERE count=${data.count}`;

              const values = [
                data.Ad_Type,
                data.count, // Use the unique identifier for the WHERE clause
                data.Property_Name, // Use the unique identifier for the WHERE clause
                data.Property_Title,
                data.Bedrooms,
                data.No_of_Bathroom,
                data.No_of_Rooms,
                data.Parking,
                data.Price,
                data.off_plan,
              ];

              const result = await queryDatabase(sql, values);
              if (result.affectedRows > 0 || result.affectedRows === 0) {
                const sql = `UPDATE ListingAgent  SET count=? , Listing_Agent=?, Listing_Agent_Email=?, Listing_Date=?, Last_Updated=?, completion_status=?, permit_number=?, Property_Ref_No=? WHERE count=${data.count}`;

                const values = [
                  data.count,
                  data.Listing_Agent,
                  data.Listing_Agent_Email,
                  data.Listing_Date,
                  data.Last_Updated,
                  data.completion_status,
                  data.permit_number,
                  data.Property_Ref_No,
                ];
                const result = await queryDatabase(sql, values);
                if (result.affectedRows > 0 || result.affectedRows === 0) {
                  const sql = `UPDATE ListingAgent  SET count=?, Listing_Agent=?,Listing_Agent_Email=?, Listing_Date=?, Last_Updated=?, completion_status=?, permit_number=?, Property_Ref_No=? WHERE count=${data.count}`;

                  const values = [
                    data.count,
                    data.Listing_Agent,
                    data.Listing_Agent_Email,
                    data.Listing_Date,
                    data.Last_Updated,
                    data.completion_status,
                    data.permit_number,
                    data.Property_Ref_No,
                  ];
                  const result = await queryDatabase(sql, values);
                  if (result.affectedRows > 0 || result.affectedRows === 0) {
                    const sql = `UPDATE PropertyLocation SET count=? , Latitude=?, Longitude=? WHERE count=${data.count}`;

                    const values = [data.count, data.Latitude, data.Longitude];
                    const result = await queryDatabase(sql, values);
                    if (result.affectedRows > 0 || result.affectedRows === 0) {
                      const sql = `UPDATE UnitDetails SET count=?, Unit_Type=?, Unit_Reference_No=? , Unit_Model=?, Unit_Builtup_Area=? , Plot_Area=?,  unit_measure=? WHERE count=${data.count}`;

                      const values = [
                        data.count,
                        data.Unit_Type,
                        data.Unit_Reference_No,
                        data.Unit_Model,
                        data.Unit_Builtup_Area,
                        data.Plot_Area,
                        data.unit_measure,
                      ];
                      const result = await queryDatabase(sql, values);
                      if (
                        result.affectedRows > 0 ||
                        result.affectedRows === 0
                      ) {
                        const sql = `UPDATE PropertyArea SET count=? , Community=?, Emirate=? , Primary_View=?, Audio_Tour=? , PreviewLink=?,  virtual_Tour=?,  Web_Tour=?, Threesixty_Tour=? WHERE count=${data.count}`;

                        const values = [
                          data.count,
                          data.Community,
                          data.Emirate,
                          data.Primary_View,
                          data.Audio_Tour,
                          data.PreviewLink,
                          data.virtual_Tour,
                          data.Web_Tour,
                          data.Threesixty_Tour,
                        ];
                        const result = await queryDatabase(sql, values);
                        if (
                          result.affectedRows > 0 ||
                          result.affectedRows === 0
                        ) {
                          const sql = ` UPDATE Facilities SET count=? , Facilities=? WHERE count=${data.count}`;
                          const Facilities = data.Facilities;
                          const facilitiesArray = Facilities.map(
                            (item) => item.facility
                          );
                          const flattenedFacilitiesArray = facilitiesArray.flat();
                          const values = [data.count, JSON.stringify(flattenedFacilitiesArray)];

                          const result = await queryDatabase(sql, values);
                          if (
                            result.affectedRows > 0 ||
                            result.affectedRows === 0
                          ) {
                            const sql = ` UPDATE OtherImpData SET count=?, Cheques=?, Exclusive=?, Featured=?, Fitted=?, Strno=?, company_logo=?, company_name=?, QR_Code=?, price_on_application=? WHERE count=${data.count}`;

                            const values = [
                              data.count,
                              data.Cheques,
                              data.Exclusive,
                              data.Featured,
                              data.Fitted,
                              data.Strno,
                              data.company_logo,
                              data.company_name,
                              data.QR_Code,
                              data.price_on_application,
                            ];
                            const result = await queryDatabase(sql, values);
                            if (
                              result.affectedRows > 0 ||
                              result.affectedRows === 0
                            ) {
                              const sql = `UPDATE PropertiesImages SET count=?, Imagelink=? WHERE count=${data.count}`;
                              const Images = data.Images;
                              const imagesArray = Images.map(
                                (item) => item.image
                              );
                              const flattenedImagesArray = imagesArray.flat();
                              const values = [data.count, JSON.stringify(flattenedImagesArray)];

                              const result = await queryDatabase(sql, values);
                              if (
                                result.affectedRows > 0 ||
                                result.affectedRows === 0
                              ) {
                                const sql = `UPDATE WebRemarks SET count=?, Web_Remarks=?, Property_Name=? WHERE count=${data.count}`;

                                const values = [
                                  data.count,
                                  data.Web_Remarks,
                                  data.Property_Name,
                                ];
                                const result = await queryDatabase(sql, values);
                              } else {
                                console.log("WebRemarks is updated!");
                              }
                            } else {
                              console.log("PropertiesImages is updated!");
                            }
                          } else {
                            console.log("OtherImpData is updated!");
                          }
                        } else {
                          console.log("Facilities is updated!");
                        }
                      } else {
                        console.log("PropertyArea is updated!");
                      }
                    } else {
                      console.log("UnitDetails is updated!");
                    }
                  } else {
                    console.log("PropertyLocation is updated!");
                  }
                } else {
                  console.log("ListingAgent is updated!");
                }
              } else {
                console.log("ListingAgent is updated!");
              }
            }
          } catch (error) {
            console.error("Database error:", error);
          }
        }
        // res.status(200).json({ message: 'Data processing completed' });
        res.json(filterdata);
      } else {
        console.log("filterdata is not an array or is empty");
        res.status(400).json({ error: "Invalid data format" });
      }
    });
  } catch (error) {
    console.error("Error fetching data from API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// cron.schedule("*/10 * * * * *", async () => {
//   try {
//     const apiUrl =
//       "https://xml.propspace.com/feed/xml.php?cl=3379&pid=8245&acc=8807"; // Replace with your API URL
//     const response = await axios.get(apiUrl);
//     xml2js.parseString(response.data, async (err, result) => {
//       if (err) {
//         console.error("Error parsing XML:", err);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }

//       // 'result' now contains the JSON representation of the XML data
//       const FullData = result;
//       const filterdata = FullData.Listings.Listing;
//       if (Array.isArray(filterdata)) {
//         for (const data of filterdata) {
//           const sql = `SELECT * FROM basicpropertiesdetails WHERE count =?`;
//           const values = [data.count];
//           try {
//             const results = await queryDatabase(sql, values);
//             if (results.length === 0) {
//               const insertSql = `INSERT INTO basicpropertiesdetails VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
//               const insertValues = [
//                 data.Ad_Type,
//                 data.count,
//                 data.Property_Name,
//                 data.Property_Title,
//                 data.Bedrooms,
//                 data.No_of_Bathroom,
//                 data.No_of_Rooms,
//                 data.Parking,
//                 data.Price,
//                 data.off_plan,
//               ];

//               const results = await queryDatabase(insertSql, insertValues);
//               if (results.affectedRows > 0) {
//                 const insertSql = `INSERT INTO ListingAgent VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)`;
//                 const insertValues = [
//                   data.count,
//                   data.Listing_Agent,
//                   data.Listing_Agent_Email,
//                   data.Listing_Date,
//                   data.Last_Updated,
//                   data.completion_status,
//                   data.permit_number,
//                   data.Property_Ref_No,
//                 ];
//                 const results = await queryDatabase(insertSql, insertValues);
//                 if (results.affectedRows > 0) {
//                   const insertSql = `INSERT INTO PropertyLocation VALUES (null, ?, ?, ?)`;
//                   const insertValues = [
//                     data.count,
//                     data.Latitude,
//                     data.Longitude,
//                   ];
//                   const results = await queryDatabase(insertSql, insertValues);
//                   if (results.affectedRows > 0) {
//                     const insertSql = ` INSERT INTO UnitDetails VALUES (null, ?, ?, ?, ?, ?, ? , ?)`;
//                     const insertValues = [
//                       data.count,
//                       data.Unit_Type,
//                       data.Unit_Reference_No,
//                       data.Unit_Model,
//                       data.Unit_Builtup_Area,
//                       data.Plot_Area,
//                       data.unit_measure,
//                     ];
//                     const results = await queryDatabase(
//                       insertSql,
//                       insertValues
//                     );
//                     if (results.affectedRows > 0) {
//                       const insertSql = `INSERT INTO PropertyArea VALUES (null, ?, ?, ?, ?, ? , ?, ?, ? ,?)`;
//                       const insertValues = [
//                         data.count,
//                         data.Community,
//                         data.Emirate,
//                         data.Primary_View,
//                         data.Audio_Tour,
//                         data.PreviewLink,
//                         data.virtual_Tour,
//                         data.Web_Tour,
//                         data.Threesixty_Tour,
//                       ];
//                       const results = await queryDatabase(
//                         insertSql,
//                         insertValues
//                       );

//                       if (results.affectedRows > 0) {
//                         const Facilities = data.Facilities;
//                         const facilitiesArray = Facilities.map(
//                           (item) => item.facility
//                         );
//                         const flattenedFacilitiesArray = facilitiesArray.flat();


//                         const insertSql = `INSERT INTO Facilities (count, Facilities) VALUES (?, ?)`;
//                         const insertValues = [
//                           data.count,
//                           JSON.stringify(flattenedFacilitiesArray),
//                         ];
//                         const results = await queryDatabase(
//                           insertSql,
//                           insertValues
//                         );

//                         if (results.affectedRows > 0) {
//                           const insertSql = `INSERT INTO OtherImpData VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//                           const insertValues = [
//                             data.count,
//                             data.Cheques,
//                             data.Exclusive,
//                             data.Featured,
//                             data.Fitted,
//                             data.Strno,
//                             data.company_logo,
//                             data.company_name,
//                             data.QR_Code,
//                             data.price_on_application,
//                           ];
//                           const results = await queryDatabase(
//                             insertSql,
//                             insertValues
//                           );
//                           if (results.affectedRows > 0) {
//                             const Images = data.Images;

//                             const imagesArray = Images.map((item) => item.image);
//                             const flattenedImagesArray = imagesArray.flat();

//                             const insertSql = `INSERT INTO PropertiesImages (count, Imagelink) VALUES (?, ?)`;
//                             const insertValues = [data.count, JSON.stringify(flattenedImagesArray)];

//                             const results = await queryDatabase(
//                               insertSql,
//                               insertValues
//                             );

//                             if (results.affectedRows > 0) {
//                               const insertSql = `INSERT INTO WebRemarks VALUES (null, ?, ? , ?)`;
//                               const insertValues = [
//                                 data.count,
//                                 data.Web_Remarks,
//                                 data.Property_Name,
//                               ];
//                               const results = await queryDatabase(
//                                 insertSql,
//                                 insertValues
//                               );
//                             } else {
//                               console.log("PropertiesImages error");
//                             }
//                           } else {
//                             console.log("OtherImpData error");
//                           }
//                         } else {
//                           console.log("Facilities error");
//                         }
//                       } else {
//                         console.log("PropertyArea error");
//                       }
//                     } else {
//                       console.log("UnitDetails error");
//                     }
//                   } else {
//                     console.log("PropertyLocation error");
//                   }
//                 } else {
//                   console.log("ListingAgent error");
//                 }
//               } else {
//                 console.log("basicpropertiesdetails error");
//               }
//             } else {
//               const sql = `UPDATE basicpropertiesdetails SET Ad_Type=?,count=? , Property_Name=?,Property_Title=?, Bedrooms=?, No_of_Bathroom=?, No_of_Rooms=?,
//                             Parking=?, Price=?, off_plan=? WHERE count=${data.count}`;

//               const values = [
//                 data.Ad_Type,
//                 data.count, // Use the unique identifier for the WHERE clause
//                 data.Property_Name, // Use the unique identifier for the WHERE clause
//                 data.Property_Title,
//                 data.Bedrooms,
//                 data.No_of_Bathroom,
//                 data.No_of_Rooms,
//                 data.Parking,
//                 data.Price,
//                 data.off_plan,
//               ];

//               const result = await queryDatabase(sql, values);
//               if (result.affectedRows > 0 || result.affectedRows === 0) {
//                 const sql = `UPDATE ListingAgent  SET count=? , Listing_Agent=?, Listing_Agent_Email=?, Listing_Date=?, Last_Updated=?, completion_status=?, permit_number=?, Property_Ref_No=? WHERE count=${data.count}`;

//                 const values = [
//                   data.count,
//                   data.Listing_Agent,
//                   data.Listing_Agent_Email,
//                   data.Listing_Date,
//                   data.Last_Updated,
//                   data.completion_status,
//                   data.permit_number,
//                   data.Property_Ref_No,
//                 ];
//                 const result = await queryDatabase(sql, values);
//                 if (result.affectedRows > 0 || result.affectedRows === 0) {
//                   const sql = `UPDATE ListingAgent  SET count=?, Listing_Agent=?,Listing_Agent_Email=?, Listing_Date=?, Last_Updated=?, completion_status=?, permit_number=?, Property_Ref_No=? WHERE count=${data.count}`;

//                   const values = [
//                     data.count,
//                     data.Listing_Agent,
//                     data.Listing_Agent_Email,
//                     data.Listing_Date,
//                     data.Last_Updated,
//                     data.completion_status,
//                     data.permit_number,
//                     data.Property_Ref_No,
//                   ];
//                   const result = await queryDatabase(sql, values);
//                   if (result.affectedRows > 0 || result.affectedRows === 0) {
//                     const sql = `UPDATE PropertyLocation SET count=? , Latitude=?, Longitude=? WHERE count=${data.count}`;

//                     const values = [data.count, data.Latitude, data.Longitude];
//                     const result = await queryDatabase(sql, values);
//                     if (result.affectedRows > 0 || result.affectedRows === 0) {
//                       const sql = `UPDATE UnitDetails SET count=?, Unit_Type=?, Unit_Reference_No=? , Unit_Model=?, Unit_Builtup_Area=? , Plot_Area=?,  unit_measure=? WHERE count=${data.count}`;

//                       const values = [
//                         data.count,
//                         data.Unit_Type,
//                         data.Unit_Reference_No,
//                         data.Unit_Model,
//                         data.Unit_Builtup_Area,
//                         data.Plot_Area,
//                         data.unit_measure,
//                       ];
//                       const result = await queryDatabase(sql, values);
//                       if (
//                         result.affectedRows > 0 ||
//                         result.affectedRows === 0
//                       ) {
//                         const sql = `UPDATE PropertyArea SET count=? , Community=?, Emirate=? , Primary_View=?, Audio_Tour=? , PreviewLink=?,  virtual_Tour=?,  Web_Tour=?, Threesixty_Tour=? WHERE count=${data.count}`;

//                         const values = [
//                           data.count,
//                           data.Community,
//                           data.Emirate,
//                           data.Primary_View,
//                           data.Audio_Tour,
//                           data.PreviewLink,
//                           data.virtual_Tour,
//                           data.Web_Tour,
//                           data.Threesixty_Tour,
//                         ];
//                         const result = await queryDatabase(sql, values);
//                         if (
//                           result.affectedRows > 0 ||
//                           result.affectedRows === 0
//                         ) {
//                           const sql = ` UPDATE Facilities SET count=? , Facilities=? WHERE count=${data.count}`;
//                           const Facilities = data.Facilities;
//                           const facilitiesArray = Facilities.map(
//                             (item) => item.facility
//                           );
//                           const flattenedFacilitiesArray = facilitiesArray.flat();
//                           const values = [data.count, JSON.stringify(flattenedFacilitiesArray)];

//                           const result = await queryDatabase(sql, values);
//                           if (
//                             result.affectedRows > 0 ||
//                             result.affectedRows === 0
//                           ) {
//                             const sql = ` UPDATE OtherImpData SET count=?, Cheques=?, Exclusive=?, Featured=?, Fitted=?, Strno=?, company_logo=?, company_name=?, QR_Code=?, price_on_application=? WHERE count=${data.count}`;

//                             const values = [
//                               data.count,
//                               data.Cheques,
//                               data.Exclusive,
//                               data.Featured,
//                               data.Fitted,
//                               data.Strno,
//                               data.company_logo,
//                               data.company_name,
//                               data.QR_Code,
//                               data.price_on_application,
//                             ];
//                             const result = await queryDatabase(sql, values);
//                             if (
//                               result.affectedRows > 0 ||
//                               result.affectedRows === 0
//                             ) {
//                               const sql = `UPDATE PropertiesImages SET count=?, Imagelink=? WHERE count=${data.count}`;
//                               const Images = data.Images;
//                               const imagesArray = Images.map(
//                                 (item) => item.image
//                               );
//                               const flattenedImagesArray = imagesArray.flat();
//                               const values = [data.count, JSON.stringify(flattenedImagesArray)];

//                               const result = await queryDatabase(sql, values);
//                               if (
//                                 result.affectedRows > 0 ||
//                                 result.affectedRows === 0
//                               ) {
//                                 const sql = `UPDATE WebRemarks SET count=?, Web_Remarks=?, Property_Name=? WHERE count=${data.count}`;

//                                 const values = [
//                                   data.count,
//                                   data.Web_Remarks,
//                                   data.Property_Name,
//                                 ];
//                                 const result = await queryDatabase(sql, values);
//                               } else {
//                                 console.log("WebRemarks is updated!");
//                               }
//                             } else {
//                               console.log("PropertiesImages is updated!");
//                             }
//                           } else {
//                             console.log("OtherImpData is updated!");
//                           }
//                         } else {
//                           console.log("Facilities is updated!");
//                         }
//                       } else {
//                         console.log("PropertyArea is updated!");
//                       }
//                     } else {
//                       console.log("UnitDetails is updated!");
//                     }
//                   } else {
//                     console.log("PropertyLocation is updated!");
//                   }
//                 } else {
//                   console.log("ListingAgent is updated!");
//                 }
//               } else {
//                 console.log("ListingAgent is updated!");
//               }
//             }
//           } catch (error) {
//             console.error("Database error:", error);
//           }
//         }
//       } else {
//         console.log("filterdata is not an array or is empty");
//         res.status(400).json({ error: "Invalid data format" });
//       }
//     });


//     console.log("Task completed!");
//   }catch (error) {
//     console.error("Error fetching data from API:", error);
//   }
// });


// Get all FAQs
app.get('/api/getfaqs', (req, res) => {
  connection.query('SELECT * FROM faqs ORDER BY position', (err, results) => {
    if (err) {
      res.status(500).send('Server error');
		
    } else {
      res.json(results);
    }
  });
});

// GET ALL PROPERTIES 
app.get("/getnewly", (req, res) => {
  console.log("coming in this");
  const sql = "select* from newly";
  connection.query(sql, (err, results) => {
    console.log(results,"coming");
    res.json(results);
  });
});
app.get("/getpropertybyid/:id", (req, res) => {
  const id = req.params.id;
  const sql = `select* from newly where id= ${id}`;
  connection.query(sql, (err, results) => {
    console.log(results);
    res.json(results);
  });
});
// GET ALL Property Imges 
app.get("/getallpropertyImages", (req, res) => {
  const sql = "select* from newlytableimages";
  connection.query(sql, (err, results) => {
    res.json(results);
  });
});



app.post("/collectbrochuredata", (req, res) => {
  console.log(req.body);
  let data = {
    name: req.body.Name,
    email: req.body.email,
    mobile: req.body.dialcode + req.body.Phone,
    propertyname: req.body.propertyname,
  };
  console.log(data);
  let sql = 'insert into brochuredata  set ?';
  connection.query(sql, data, (err, results) => {
    if (err) throw err;

    res.status(200).send("Data inserted successfully");
  });
});





app.get("/getImages/:id", (req, res) => {

  const id = req.params.id;
  const sql = `select* from newly where id ='${id}'`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const propertyname = results[0].propertyname;
      const sql = `select* from newlytableimages where propertyname ='${propertyname}'`;
      connection.query(sql, (err, output) => {
        if (err) throw err;
        res.json(output)
      })
    }
  })

});
// ADD NEW PROPERTY 
app.post("/newlydata", upload.any(), (req, res) => {
  const {
    propertyname,
    propertyloaction,
    devname,
    price,
    complete,
    pagelink,
    propertydesc,
    payment,
    facilities,
    features,
    youtube,
    location
  } = req.body;
  const bannerimgFull = req.files.find(file => file.fieldname === 'bannerimg')?.path || '';
  const bannerimg = bannerimgFull ? bannerimgFull.substring(bannerimgFull.lastIndexOf('\\') + 1) : '';
  const floorFull = req.files.find(file => file.fieldname === 'floor')?.path || '';
  const floor = floorFull ? floorFull.substring(floorFull.lastIndexOf('\\') + 1) : '';
  const brochureFull = req.files.find(file => file.fieldname === 'brochure')?.path || '';
  const brochure = brochureFull ? brochureFull.substring(brochureFull.lastIndexOf('\\') + 1) : '';



  // Extract file paths for gallery images
  const galleryImageFilenames = req.files.filter(file => file.fieldname.startsWith('galleryimg')).map(file => path.basename(file.path));

  console.log(brochure, "klgj");
  const data = {
    bannerimage: bannerimg,
    developername: devname,
    propertyname: propertyname,
    propertylocation: propertyloaction,
    brochure: brochure,
    floorplan: floor,
    price: price,
    complete: complete,
    pagelink: pagelink,
    paymentplan: payment,
    youtube: youtube,
    location: location,
    description: propertydesc,
    facilities: facilities,
    keyfeature: features
  };

  let sql = 'insert into newly set ?';
  connection.query(sql, data, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.affectedRows > 0) {
      galleryImageFilenames.forEach(item => {
        const imageData = {
          propertyname: propertyname,
          imgurl: item
        };
        let imageSql = 'INSERT INTO newlytableimages SET ?';
        connection.query(imageSql, imageData, (err, imageResults) => {
          if (err) {
            console.error('Error inserting image:', err);
          }
        });
      });
      console.log("Data is added sucessfully");
      return res.status(200).json({ success: true });
    }
  });
});

// GET PROPERTY BY ID 
app.get("/newlyedit/:id", (req, res) => {
  const id = req.params.id;
  const sql = `select* from newly where id=${id}`;
  connection.query(sql, (err, results) => {

    res.json(results);
  });
});

app.get("/blogdatafecth", (req, res) => {
  console.log();
  const sql = `SELECT * FROM blogs ORDER BY date DESC `;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.json(results);
  });
});
// GET BLOG BANNER
app.get('/getblogbanner', (re, res) => {
  let sql = `select* from blogbanner`;
  connection.query(sql, (err, res1) => {
    if (err) throw err;
    res.json(res1);
  })
})


// UPDATE Blog BANNER
// app.post('/bannerblog', upload.single('banner'), (req, res) => {
//   let bannerFile = req.file ? req.file.filename : null;
//   const bannertxt = req.body.bannertxt;
//   const bannerheading = req.body.bannerheading;

//   if (bannerFile) {
//     let sql = `update blogbanner set photo = ${bannerFile},  text = '${bannertxt}', bannerheading ='${bannerheading}`;
//     connection.query(sql, (err, res1) => {
//       if (err) {
//         console.error('Error updating blog banner:', err);
//         res.status(500).send('Internal Server Error');
//       } else if (res1.affectedRows > 0) {
//         console.log("Updated!");
//         res.status(201).send('Data is Updated');
//       }
//     });
//   } else {
//     let sql = `update blogbanner set text = '${bannertxt}', bannerheading ='${bannerheading}`;
//     connection.query(sql, (err, res1) => {
//       if (err) {
//         console.error('Error updating blog banner:', err);
//         res.status(500).send('Internal Server Error');
//       } else if (res1.affectedRows > 0) {
//         console.log("Updated!");
//         res.status(201).send('Data is Updated');
//       }
//     });
//   }
// });
app.post('/bannerblog', upload.single('banner'), (req, res) => {
  const bannerFile = req.file ? req.file.filename : null;
  const bannertxt = req.body.bannertxt;
  const bannerheading = req.body.bannerheading;

  if (bannerFile) {
    const query = `
      UPDATE blogbanner
      SET photo = ?, text = ?, bannerheading = ?
    `;
    connection.query(
      query,
      [bannerFile, bannertxt, bannerheading],
      (err, result) => {
        if (err) {
          console.error('Error updating blog banner:', err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log("Updated!");
          res.status(201).send('Data is Updated');
        }
      }
    );
  } else {
    const query = `
      UPDATE blogbanner
      SET text = ?, bannerheading = ?
    `;
    connection.query(
      query,
      [bannertxt, bannerheading],
      (err, result) => {
        if (err) {
          console.error('Error updating blog banner:', err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log("Updated!");
          res.status(201).send('Data is Updated');
        }
      }
    );
  }
});

//UPDATE NEW PROPERTY
app.post("/updatenewlyproperty/:id", upload.any(), (req, res) => {
  const id = req.params.id;
  const {
    propertyname,
    propertyloaction,
    devname,
    complete,
    price,
    pagelink,
    propertydesc,
    payment,
    facilities,
    features,
    youtube,
    location


  } = req.body;


  const bannerimgFull = req.files.find(file => file.fieldname === 'bannerimg');
  const floorFull = req.files.find(file => file.fieldname === 'floor');
  const brochureFull = req.files.find(file => file.fieldname === 'brochure');
  // const youtubeFull = req.files.find(file => file.fieldname === 'youtube');
  // const LocationFull = req.files.find(file => file.fieldname === 'location');

  let sql = `UPDATE newly SET `;
  const values = [];

  if (bannerimgFull) {
    const bannerimg = bannerimgFull.path.substring(bannerimgFull.path.lastIndexOf('\\') + 1);
    sql += `bannerimage = ?, `;
    values.push(bannerimg);
  }

  if (floorFull) {
    const floor = floorFull.path.substring(floorFull.path.lastIndexOf('\\') + 1);
    sql += `floorplan = ?, `;
    values.push(floor);
  }

  if (brochureFull) {
    const brochure = brochureFull.path.substring(brochureFull.path.lastIndexOf('\\') + 1);
    sql += `brochure = ?, `;
    values.push(brochure);
  }

  // if (youtubeFull) {
  //     const youtube = youtubeFull.path.substring(youtubeFull.path.lastIndexOf('\\') + 1);
  //     sql += `youtube = ?, `;
  //     values.push(youtube);
  // }

  // if (LocationFull) {
  //     const location = LocationFull.path.substring(LocationFull.path.lastIndexOf('\\') + 1);
  //     sql += `location = ?, `;
  //     values.push(location);
  // }

  sql += `developername = ?, propertyname = ?, propertylocation = ?, price = ?,complete=?,  youtube = ?, location = ?, pagelink = ?,description = ?, paymentplan = ?, facilities = ?, keyfeature = ? WHERE id = ?`;
  values.push(devname, propertyname, propertyloaction, price, complete, youtube, location, pagelink, propertydesc, payment, facilities, features, id);


  console.log(values);
  connection.query(sql, values, (err, results) => {
    if (err) throw err;
    if (results.affectedRows > 0) {
      console.log("Data is updated!");
      res.status(200).json({ message: "Data is updated" })
    }

  });


});

// UPDATE IMAGE
app.put('/editnewpropertyImages/:index', upload.single('bannerimg'), (req, res) => {
  console.log("in enter");
  const index = req.params.index;
  console.log(index, "okay");
  const updatedImage = req.file.filename;
  console.log(updatedImage, "kjlgb");
  const sql = `update newlytableimages set imgurl ='${updatedImage}' where id='${index}'`;
  console.log(sql);
  connection.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Data is updated");
    // if(results.affectedRows>0){
    //   console.log("Data is updted");
    res.status(200).json({ message: "Image is updated!" })
    // }
  })


});

//DELETE IMAGE 
app.delete("/deletepropertyimage/:id", (req, res) => {
  const id = req.params.id;
  const sql = `delete from newlytableimages where id=${id}`;
  connection.query(sql, (err, _results) => {
    if (err) throw err;
    res.status(200).json({ message: "Image is deleted!" })
  })
});
app.post("/deleteproperty", (req, res) => {
  console.log(req.body.id);
  const id = req.body.id;
  const propertyname = req.body.propertyname;

  const sql = `delete from newly where id=${id}`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    if (results.affectedRows > 0) {
      const sql = `delete from newlytableimages where propertyname='${propertyname}'`;
      connection.query(sql, (err, results) => {
        if (err) throw err;
        console.log("Dataa is deleted");
        res.status(200).json({ message: "Image is deleted!" })
      })
    }
  })
})


// SAVE PAGE TO DB

app.post('/api/save-page', (req, res) => {
  const { title, html, css, linkAddress, seoTitle, metaDescription, keywords, pageVal } = req.body;
  console.log(req.body);

  let query;

  if (pageVal === 'pages') {
    // Insert into 'pages' table
    query = 'INSERT INTO pages (title, linkAddress, seoTitle, metaDescription, keywords, fileurl, cssurl,type) VALUES (?, ?, ?, ?, ?, ?, ?,?)';

  } else if (pageVal === 'newproperty') {
    // Insert into 'newpropertiestable' table
    query = 'INSERT INTO newpropertiestable (title, linkAddress, seoTitle, metaDescription, keywords, fileurl, cssurl,type) VALUES (?, ?, ?, ?, ?, ?, ?,?)';

  } else {
    // Handle other cases or provide an error response
    res.status(400).send('Invalid value for pageVal');
    return;
  }

  connection.query(query, [title, linkAddress, seoTitle, metaDescription, keywords, `page_${linkAddress}.html`, `page_${linkAddress}.css`, "on"], (err, result) => {
    if (err) {
      console.error('Error saving page:', err);
      res.status(500).send('Failed to save page');
    } else {
      const pageId = result.insertId;
      // Save HTML to file
      const htmlFileName = `page_${linkAddress}.html`;
      const htmlFilePath = path.join(__dirname, 'public/uploads', htmlFileName);
      fs.writeFileSync(htmlFilePath, html);

      // Save CSS to file
      const cssFileName = `page_${linkAddress}.css`;
      const cssFilePath = path.join(__dirname, 'public/uploads', cssFileName);
      fs.writeFileSync(cssFilePath, css);
      res.status(200).send({ message: 'Page saved successfully', id: pageId });
    }
  });
});



// Endpoint to get saved pages
app.get('/api/pages', (req, res) => {
  const query = 'SELECT * FROM pages WHERE type="on" ORDER BY created_at DESC'; // Adjust based on your actual table structure

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching pages:', err);
      res.status(500).send('Failed to fetch pages');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/api/getcode/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM pages WHERE id = ${id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result)
  });
});





// Endpoint to get saved pages
app.get('/api/pages', (req, res) => {
  const query = 'SELECT * FROM pages'; // Adjust based on your actual table structure

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching pages:', err);
      res.status(500).send('Failed to fetch pages');
    } else {
      res.status(200).json(results);
    }
  });
});


// app.get('/api/pages/:id', (req, res) => {
//   const { id } = req.params;
//   const query = 'SELECT * FROM pages WHERE id = ?';

//   connection.query(query, [id], (err, result) => {
//     if (err) {
//       console.error('Error fetching page:', err);
//       res.status(500).send('Failed to fetch page');
//     } else {
//       res.status(200).json(result[0]);
//     }
//   });
// });

// Route to get page data by ID
// app.get('/api/pages/:id', (req, res) => {

//   const idval = req.params.id;
//   const id=parseInt(idval);

//   let tableName;
//   if (id < 1000) {
//     tableName = 'pages';
//   } else if (id >= 1000) {
//     tableName = 'newpropertiestable';
//   } else {
//     res.status(400).send('Invalid value for pages');
//     return;
//   }
//   const query = `SELECT * FROM ${tableName} WHERE id = ${idval}`;
//   console.log(query);
//   connection.query(query, (err, result) => {
//     if (err) {
//       throw err;
//     }

//     const hfile = result[0].fileurl;
//     console.log(hfile);
//     const filePath = path.join(__dirname, 'public', 'uploads', hfile);
//     fs.readFile(filePath, 'utf8', (err, fileContent) => {
//       if (err) {
//         throw err;
//       }
//       const cssfile = result[0].cssurl;
//       const cssFilePath = path.join(__dirname, 'public', 'uploads', cssfile);
//       fs.readFile(cssFilePath, 'utf8', (cssErr, cssContent) => {
//         if (cssErr) {
//           throw cssErr;
//         }
//         const data = {
//           result: result[0],
//           fileContent: fileContent,
//           cssfile: cssContent
//         };


//         res.json(data);
//       });
//     });
//   });
// });
// Route to get page data by ID
app.get('/api/pages/:id', (req, res) => {
  console.log(":here");
  const idval = req.params.id;
  const id = parseInt(idval);

  let tableName;
  if (id < 1000) {
    tableName = 'pages';
  } else if (id >= 1000) {
    tableName = 'newpropertiestable';
  } else {
    res.status(400).send('Invalid value for pages');
    return;
  }
  const query = `SELECT * FROM ${tableName} WHERE id = ${idval}`;
  console.log(query);
  connection.query(query, (err, result) => {
    if (err) {
      throw err;
    }

    const hfile = result[0].fileurl;
    console.log(hfile);
    const filePath = path.join(__dirname, 'public', 'uploads', hfile);
    fs.readFile(filePath, 'utf8', (err, fileContent) => {
      if (err) {
        throw err;
      }
      const cssfile = result[0].cssurl;
      const cssFilePath = path.join(__dirname, 'public', 'uploads', cssfile);
      fs.readFile(cssFilePath, 'utf8', (cssErr, cssContent) => {
        if (cssErr) {
          throw cssErr;
        }
        const data = {
          result: result[0],
          fileContent: fileContent,
          cssfile: cssContent
        };


        res.json(data);
      });
    });
  });
});


// Endpoint to update an existing page

app.put('/api/pages/:id', (req, res) => {
  const { id } = req.params;
  const { title, html, css, linkAddress, seoTitle, metaDescription, keywords } = req.body;
  const myid = parseInt(id);
  const isUpdatePagesTable = myid < 1000;

  let tableName, fileurl, cssurl;

  if (isUpdatePagesTable) {
    tableName = 'pages';
    fileurl = `page_${linkAddress}.html`;
    cssurl = `page_${linkAddress}.css`;
  } else {
    tableName = 'newpropertiestable'; // Change this to the actual table name
    fileurl = `page_${linkAddress}.html`; // Change this to the actual file format
    cssurl = `page_${linkAddress}.css`; // Change this to the actual file format
  }

  const existingHtmlFileName = `${fileurl}`;
  const existingHtmlFilePath = path.join(__dirname, 'public/uploads', existingHtmlFileName);
  // const existingHtmlFilePath1 = path.join(__dirname, './build/uploads', existingHtmlFileName);
  try {
    fs.unlinkSync(existingHtmlFilePath);
    // fs.unlinkSync(existingHtmlFilePath1);
  } catch (err) {
    console.error('Error deleting existing HTML file:', err);
  }

  const existingCssFileName = `${cssurl}`;
  const existingCssFilePath = path.join(__dirname, 'public/uploads', existingCssFileName);
  // const existingCssFilePath1 = path.join(__dirname, './build/uploads', existingCssFileName);
  try {
    fs.unlinkSync(existingCssFilePath);
    // fs.unlinkSync(existingCssFilePath1);
  } catch (err) {
    console.error('Error deleting existing CSS file:', err);
  }

  const query = `UPDATE ${tableName} SET title=?, linkAddress=?, seoTitle=?, metaDescription=?, keywords=?, fileurl=?, cssurl=? WHERE id=?`;

  connection.query(
    query,
    [title, linkAddress, seoTitle, metaDescription, keywords, fileurl, cssurl, id],
    (err, result) => {
      if (err) {
        console.error('Error updating page:', err);
        return res.status(500).send('Failed to update page');
      }

      const updatedHtmlFileName = `${fileurl}`;
      const updatedHtmlFilePath = path.join(__dirname, 'public/uploads', updatedHtmlFileName);
      // const updatedHtmlFilePath1 = path.join(__dirname, './build/uploads', updatedHtmlFileName);
      fs.writeFileSync(updatedHtmlFilePath, html);
      // fs.writeFileSync(updatedHtmlFilePath1, html);

      const updatedCssFileName = `${cssurl}`;
      const updatedCssFilePath = path.join(__dirname, 'public/uploads', updatedCssFileName);
      // const updatedCssFilePath1 = path.join(__dirname, './build/uploads', updatedCssFileName);
      fs.writeFileSync(updatedCssFilePath, css);
      // fs.writeFileSync(updatedCssFilePath1, css);

      res.status(200).send({ message: 'Page updated successfully', id });
    }
  );
});


// Endpoint to delete a page
app.delete('/api/pages/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM pages WHERE id = ?';

  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting page:', err);
      return res.status(500).send('Failed to delete page');
    }
    res.status(200).send({ message: 'Page deleted successfully' });
  });
});


// app.get('/api/pagedata/:url', (req, res) => {
//   const url = req.params.url;
//   const pageQuery = 'SELECT * FROM pages WHERE linkAddress = ?';
//   connection.query(pageQuery, [url], (err, pageResults) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }

//     if (pageResults.length > 0) {
//       const additionalData = { type: 'pages' };
//       const modifiedResult = { ...pageResults[0], ...additionalData };
//       return res.json(modifiedResult);
//     } 
//     else if(pageResults.length == 0){
//       const sql =`SELECT * FROM newpropertiestable WHERE linkAddress ='${url}'`;
//       console.log(sql);
//       connection.query(sql,(err,propertiespages)=>{
//         if(err) throw err;
//         const additionalData = { type: 'pages' };
//         const modifiedResult = { ...pageResults[0], ...additionalData };
//         return res.json(modifiedResult);
//       })
//     }else {
//       // If no page found, then check blogs
//       const blogQuery = 'SELECT * FROM blogs WHERE url = ?';
//       connection.query(blogQuery, [url], (err, blogResults) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         if (blogResults.length > 0) {
//           const additionalData = { type: 'blogs' };
//           const modifiedResult = { ...blogResults[0], ...additionalData };
//           return res.json(modifiedResult);
//         } else {
//           return res.status(404).json({ error: 'Page not found' });
//         }
//       });
//     }
//   });
// });

app.get('/api/pagedata/:url', (req, res) => {
  const url = req.params.url;
  const pageQuery = 'SELECT * FROM blogs WHERE url = ?';
  connection.query(pageQuery, [url], (err, pageResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (pageResults.length > 0) {
      const additionalData = { type: 'blogs' };
      const modifiedResult = { ...pageResults[0], ...additionalData };
      return res.json(modifiedResult);
    }
    else {
      const sql = `SELECT * FROM newpropertiestable WHERE linkAddress ='${url}'`;
      connection.query(sql, (err, propertiespages) => {
        if (err) throw err;
        if (propertiespages.length > 0) {
          const additionalData = { type: 'pages' };
          const modifiedResult = { ...propertiespages[0], ...additionalData };
          return res.json(modifiedResult);

        }
        else {
          const sql = `SELECT * FROM pages WHERE linkAddress ='${url}'`;
          connection.query(sql, (err, pagesdata) => {
            if (err) throw err;
            const additionalData = { type: 'pages' };
            const modifiedResult = { ...pagesdata[0], ...additionalData };
            return res.json(modifiedResult);
          })
        }
      })
    }

  });
});



app.get('/api/homepage', (req, res) => {
  const query = 'SELECT * FROM pages WHERE linkAddress = "home"'; // Assuming 'home' is the identifier for the homepage
  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result[0]);
      // console.log(result);
    }
  });
});

app.post('/updatewindowopen', (req, res) => {
  const selectedOption = req.body.selectedOption;
  const sql = `update navigation set `
})

// Get navigation items
app.get('/api/navigation', (req, res) => {
  connection.query('SELECT * FROM navigation ORDER BY position', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving data' });
    }
    res.json(results);
  });
});

// Add a navigation item
app.post('/api/navigation', (req, res) => {
  const { title, urls, position, windowopen } = req.body;

  connection.query('INSERT INTO navigation (title, urls, position,openin) VALUES (?, ?, ?,?)', [title, urls, position, windowopen], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding item' });
    }
    res.status(201).json({ message: 'Item added successfully' });
  });
});

// Update a navigation item
// app.put('/api/navigation/:id', (req, res) => {

//   const { title, urls, position, windowopen } = req.body;
//   const { id } = req.params;
//   connection.query('UPDATE navigation SET title = ?, urls = ?, position = ?, openin = ? WHERE id = ?', [title, urls, position, windowopen, id], (err) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error updating item' });
//     }
//     res.json({ message: 'Item updated successfully' });
//   });
// });

app.put('/api/navigation/:id', (req, res) => {
  const { title, urls, position, windowopen } = req.body;
  const { id } = req.params;
  const sql = `update navigation set title ='${title}', urls ='${urls}', position='${position}', openin='${windowopen}' where id='${id}'`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).json({ message: "Data is updated" })
    console.log("Data is updated");
  })
})

// Delete a navigation item
app.delete('/api/navigation/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM navigation WHERE id = ?', [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error deleting navigation item');
    }
    res.send('Navigation item deleted successfully');
  });
});


// Get header styles
app.get('/api/header-styles', (req, res) => {

  connection.query('SELECT * FROM header_styles', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving data' });

    }

    res.json(results);

  });

});


app.post('/api/header-editstyles', upload.single('logo'), (req, res) => {
  // Extract data from the request
  const { headerBackground, navColor, navFontSize, navFontFamily, buttonText, buttonLink, buttonTextColor,
    buttonBackgroundColor, buttonFontSize } = req.body;
  const logo = req.file ? req.file.filename : null;

  // Check if an entry already exists
  connection.query('SELECT id FROM header_styles LIMIT 1', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error checking header styles');
    }

    // If an entry exists, update it. Otherwise, insert a new one.
    if (results.length > 0) {
      if (req.file) {
        const updateQuery = `
        UPDATE header_styles
        SET header_background_color = ?, nav_color = ?, nav_font_size = ?, nav_font_family = ?, button_text = ?,
        button_link = ?, buttonTextColor = ?, buttonBackgroundColor = ?, buttonFontSize = ?, logo = ?
        WHERE id = ?
      `;

        const updateFields = [
          headerBackground, navColor, navFontSize, navFontFamily, buttonText,
          buttonLink, buttonTextColor, buttonBackgroundColor, buttonFontSize, logo, results[0].id
        ];

        connection.query(updateQuery, updateFields, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Error updating header styles');
          }
          res.json({ msg: "200" });
        });



      }
      else {
        const updateQuery = `
        UPDATE header_styles
        SET header_background_color = ?, nav_color = ?, nav_font_size = ?, nav_font_family = ?, button_text = ?,
        button_link = ?, buttonTextColor = ?, buttonBackgroundColor = ?, buttonFontSize = ?
        WHERE id = ?
      `;

        const updateFields = [
          headerBackground, navColor, navFontSize, navFontFamily, buttonText,
          buttonLink, buttonTextColor, buttonBackgroundColor, buttonFontSize, results[0].id
        ];

        connection.query(updateQuery, updateFields, (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Error updating header styles');
          }
          res.json({ msg: "200" });
        });

      }




    } else {
      // No entry found, insert a new one
      const insertQuery = `
        INSERT INTO header_styles (logo, header_background_color, nav_color, nav_font_size, nav_font_family, button_text, button_link, buttonTextColor,
        buttonBackgroundColor, buttonFontSize)
        VALUES (?, ?, ?, ?, ?, ?, ?,? ,?, ?)
      `;

      const insertFields = [
        logo, headerBackground, navColor, navFontSize, navFontFamily, buttonText,
        buttonLink, buttonTextColor, buttonBackgroundColor, buttonFontSize
      ];

      connection.query(insertQuery, insertFields, (insertErr) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).send('Error saving header styles');
        }
        res.status(201).send('Header styles saved successfully');
      });
    }
  });
});






// API endpoint to save footer settings
app.post('/api/footer-settings', upload.single('logo'), (req, res) => {
  const { menus, socialMedia, additionalInfo } = req.body;
  const logo = req.file ? req.file.filename : null;

  const parsedMenus = JSON.stringify(menus);
  const parsedSocialMedia = JSON.stringify(socialMedia);
  const parsedAdditionalInfo = JSON.stringify(additionalInfo);

  const query = `
    INSERT INTO footer_settings (logo, menus, social_media, additional_info)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
    logo = VALUES(logo),
    menus = VALUES(menus),
    social_media = VALUES(social_media),
    additional_info = VALUES(additional_info)
  `;

  connection.query(query, [logo, parsedMenus, parsedSocialMedia, parsedAdditionalInfo], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving footer settings');
    }
    res.send('Footer settings saved successfully');
  });
});


app.get('/api/get-footer-settings', (req, res) => {
  connection.query('SELECT * FROM footer_settings', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving footer settings');
    }
    res.json(results[0]);

  });
});


app.put('/api/footer-settings/:id', upload.single('logo'), (req, res) => {
  const { id } = req.params;
  const { menus, socialMedia, additionalInfo, logoPath } = req.body;

  const parsedMenus = JSON.stringify(menus);
  const parsedSocialMedia = JSON.stringify(socialMedia);
  const parsedAdditionalInfo = JSON.stringify(additionalInfo);

  // Your logic to handle file upload (if any new file is uploaded)
  let logo = req.file ? req.file.filename : null; // Assuming you are using a middleware like multer for file uploads


  const fieldsToUpdate = {};
  if (parsedMenus) fieldsToUpdate.menus = parsedMenus;
  if (parsedSocialMedia) fieldsToUpdate.social_media = parsedSocialMedia;
  if (parsedAdditionalInfo) fieldsToUpdate.additional_info = parsedAdditionalInfo;
  if (logo) fieldsToUpdate.logo = logo;


  // Construct query dynamically based on fields present
  const setClause = Object.keys(fieldsToUpdate).map(key => `${key} = ?`).join(', ');
  const queryParams = [...Object.values(fieldsToUpdate), id];


  // Use the existing logo path if a new file is not uploaded
  if (!logo && logoPath) {
    logo = logoPath;
  }


  const query = `UPDATE footer_settings SET ${setClause} WHERE id = ?`;

  connection.query(query, queryParams, (err, result) => {
    if (err) {
      console.error('Error updating page:', err);
      return res.status(500).send('Failed to update page');
    }
    res.status(200).send({ message: 'Page updated successfully', id });
  });






});



// GETTING NAV STYLES 
app.get("/api/getnavstyles", (req, res) => {
  let sql = 'select* from header_styles';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results)
  })
})



// Add FAQ
app.post('/api/faqs', (req, res) => {
  const { question, answer } = req.body;
  const query = 'INSERT INTO faqs (question, answer) VALUES (?, ?)';
  connection.query(query, [question, answer], (err, result) => {
    if (err) {
      res.status(500).send('Server error');
    } else {
      res.status(201).send('FAQ added');
    }
  });
});

// Get all FAQs
app.get('/api/faqs', (req, res) => {
  connection.query('SELECT * FROM faqs', (err, results) => {
    if (err) {
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Update FAQ
app.put('/api/faqs/:id', (req, res) => {
  const id = req.params.id;
  const { question, answer } = req.body;
  const query = 'UPDATE faqs SET question = ?, answer = ? WHERE id = ?';
  connection.query(query, [question, answer, id], (err, result) => {
    if (err) {
      res.status(500).send('Server error');
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send('FAQ not found');
      } else {
        res.status(200).send('FAQ updated');
      }
    }
  });
});


// Delete FAQ
app.delete('/api/faqs/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM faqs WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Server error');
    } else {
      if (result.affectedRows === 0) {
        res.status(404).send('FAQ not found');
      } else {
        res.status(204).end();
      }
    }
  });
});

// Add Blog  featuredhome
app.post('/api/blogs', upload.fields([{ name: 'featuredImage', maxCount: 1 }, { name: 'featuredHome', maxCount: 1 }]), (req, res) => {
  const {
    title,
    content,
    date,
    seoTitle,
    description,
    metaKeywords,
    url,
  } = req.body;

  let featuredImage = '';
  let featuredHomeImage = '';

  // Check if a new featuredImage file was uploaded
  if (req.files['featuredImage']) {
    featuredImage = req.files['featuredImage'][0].filename;
  }

  // Check if a new featuredHome file was uploaded
  if (req.files['featuredHome']) {
    featuredHomeImage = req.files['featuredHome'][0].filename;
  }

  const query = `
    INSERT INTO blogs (title, content, date, seo_title, description, meta_keywords, url, featured_image, featuredhome)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    query,
    [title, content, date, seoTitle, description, metaKeywords, url, featuredImage, featuredHomeImage],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Server error');
      } else {
        console.log(result);
        res.status(201).send('Blog added');
      }
    }
  );
});

// Update Blog
app.put('/api/blogs/:id', upload.fields([{ name: 'featuredImage', maxCount: 1 }, { name: 'featuredHome', maxCount: 1 }]), (req, res) => {
  const {
    title,
    content,
    date,
    seoTitle,
    description,
    metaKeywords,
    url,
  } = req.body;
  const { id } = req.params;

  let featuredImage = '';
  let featuredHomeImage = '';

  // Check if a new featuredImage file was uploaded
  if (req.files['featuredImage']) {

    featuredImage = req.files['featuredImage'][0].filename;
    console.log(featuredImage);
  }

  // Check if a new featuredHome file was uploaded
  if (req.files['featuredHome']) {
    featuredHomeImage = req.files['featuredHome'][0].filename;
    console.log(featuredHomeImage);
  }

  let query = `
    UPDATE blogs
    SET title = ?, content = ?, date = ?, seo_title = ?, description = ?, meta_keywords = ?, url = ?
  `;
  let queryParams = [title, content, date, seoTitle, description, metaKeywords, url];

  // Append featuredImage to the query parameters if provided
  if (featuredImage) {
    query += `, featured_image = ?`;
    queryParams.push(featuredImage);
  }

  // Append featuredHomeImage to the query parameters if provided
  if (featuredHomeImage) {
    query += `, featuredhome = ?`;
    queryParams.push(featuredHomeImage);
  }

  query += ` WHERE id = ?`;
  queryParams.push(id);
  console.log(query);
  connection.query(
    query,
    queryParams,
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        console.log(result);
        res.status(200).send('Blog updated');
      }
    }
  );
});


// Delete Blog
app.delete('/api/blogs/:id', (req, res) => {

  const memberId = req.params.id;

  const query = 'DELETE FROM blogs WHERE id = ?';

  connection.query(query, [memberId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(204).send();
    }
  });



});

// Get all Blogs
app.get('/api/blogs', (req, res) => {
  connection.query('SELECT * FROM blogs', (err, results) => {
    if (err) {
      console.error('Error fetching blogs:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});


app.get('/api/blogs/:slug', (req, res) => {
  const slug = req.params.slug;
  // Fetch blog data from database using slug
  // For example:
  // SELECT * FROM blogs WHERE slug = ?
  // Then send the blog data as a response

  const query = 'SELECT * FROM blogs where url = ?';

  connection.query(query, [slug], (err, results) => {
    if (err) {
      console.error('Error fetching blogs:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results[0]);
    }
  });




});




// Add Team Member
app.post('/api/team-members', upload.single('photo'), (req, res) => {

  const { name, designation, email, mobile } = req.body;
  const photo = req.file.filename;

  const query = 'INSERT INTO team_members (name, designation, email, mobile,photo) VALUES (?, ?, ?, ?)';

  connection.query(query, [name, designation, email, mobile, photo], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      console.log("data is added");
      res.status(201).send('Team member added');
    }
  });
});

// Get all Team Members
app.get('/api/team-members', (req, res) => {
  connection.query('SELECT * FROM team_members', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Edit Team Member by ID
// Update an existing team member
app.put('/api/team-members/:id', upload.single('photo'), (req, res) => {

  const memberId = req.params.id;
  const { name, designation, email, mobile, position, old } = req.body;
  let sql = `select* from team_members  where position=${position}`;
  connection.query(sql, (err, res1) => {
    if (err) throw err;
    const oldid = res1[0].id;
    let sql = `UPDATE team_members  SET position = ${old} WHERE id = ${oldid}`;
    connection.query(sql, (err, res2) => {
      if (err) throw err;
      if (res2.affectedRows > 0) {
        if (req.file) {
          console.log("in if ");
          const photo = req.file.filename;
          // Update the team member with the new photo
          let sql = `UPDATE team_members SET position=${position}, name='${name}', designation='${designation}', email='${email}', mobile='${mobile}',photo='${photo}' WHERE id= ${memberId}`
          console.log(sql, "sql");
          connection.query(sql, (err, result) => {
            if (err) throw err;
            console.log('Team member updated');
            res.status(200).send('Team member updated');

          }
          );
        } else {
          console.log("in else");
          // Update the team member without changing the photo
          let sql = `UPDATE team_members SET name='${name}', designation='${designation}', email='${email}',mobile='${mobile}', position='${position}' WHERE id='${memberId}'`
          connection.query(sql, (err, result) => {
            if (err) {
              res.status(500).send('Server error');
            } else {
              console.log('Team member updated');
              res.status(200).send('Team member updated');
            }
          }
          );
        }

      }

    })
  })


});



// Delete Team Member by ID
app.delete('/api/team-members/:id', (req, res) => {
  const memberId = req.params.id;

  const query = 'DELETE FROM team_members WHERE id = ?';

  connection.query(query, [memberId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(204).send();
    }
  });
});


// Add Testimonial
app.post('/api/testimonials', (req, res) => {
  const { name, time, star, review } = req.body;
  const query = 'INSERT INTO testimonials (Name, time, Star, Review) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, time, star, review], (err) => {
    if (err) res.status(500).send('Server error');
    else res.status(201).send('Testimonial added');
  });
});

// Get all Testimonials
app.get('/api/testimonials', (req, res) => {
  connection.query('SELECT * FROM testimonials', (err, results) => {
    if (err) res.status(500).send('Server error');
    else res.json(results);
  });
});

// Update Testimonial
app.put('/api/testimonials/:tid', (req, res) => {
  const { tid } = req.params;
  const { name, time, star, review } = req.body;
  const query = 'UPDATE testimonials SET Name = ?, time = ?, Star = ?, Review = ? WHERE TID = ?';
  connection.query(query, [name, time, star, review, tid], (err, result) => {
    if (err) res.status(500).send('Server error');
    else if (result.affectedRows === 0) res.status(404).send('Testimonial not found');
    else res.send('Testimonial updated');
  });
});

// Delete Testimonial
app.delete('/api/testimonials/:tid', (req, res) => {
  const { tid } = req.params;
  const query = 'DELETE FROM testimonials WHERE TID = ?';
  connection.query(query, [tid], (err, result) => {
    if (err) res.status(500).send('Server error');
    else if (result.affectedRows === 0) res.status(404).send('Testimonial not found');
    else res.status(204).end();
  });
});


// API endpoint to handle form submission
// API endpoint to handle form submission
app.post('/api/submit-form', (req, res) => {
  const { name, email, phone, countryCode, frompage } = req.body;

  const formdata = req.body;

  const commonFields = Object.entries(formdata).map(([name, value]) => ({
    name,
    value
  }));

  const jsonString = JSON.stringify(commonFields);


  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "harpreet13108159@gmail.com",
      pass: process.env.PASS
    }
  });

  // Check NaN values in formdata, not 'data'
  let nanValues = {};

  Object.entries(formdata).forEach(([key, value]) => {
    if (typeof value === 'number' && isNaN(value)) {
      nanValues[key] = 'NaN';
    }
  });

  if (Object.keys(nanValues).length > 0) {
    return res.status(400).json({
      error: "Invalid data: NaN values found",
      nanValues: nanValues
    });
  }

  let customMessage = `Dear Raine & Horne,\n\nWe have received an inquiry from the About Page:\n`;

  commonFields.forEach(({ name, value }) => {
    customMessage += `\n${name}: ${value}`;
  });

  customMessage += '\n\nThank you';

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'marketing@rhdubai.ae',
    subject: `Inquiry from ${frompage}`, // Fix the subject to include frompage
    text: customMessage
  };

  const query = 'INSERT INTO form_submissions SET formdata = ?';

  connection.query(query, [jsonString], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      // Send email after successful database insertion
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).send('Server error');
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ message: 'Form submitted successfully' });
        }
      });
    }
  });
});



// **************************************************Latest Add****************************************************

app.post('/updateterm', (req, res) => {
  const termtext = req.body.termtext;

  // Use parameterized query to prevent SQL injection
  const sql = 'UPDATE termcondition SET  termtext= ? WHERE ID = 1';

  connection.query(sql, [termtext], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: 'Internal Server Error' });
      return;
    }

    if (result.affectedRows > 0) {

      res.json({ msg: '200' });
    } else {
      res.status(404).json({ msg: 'Data not found' });
    }
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;


  // Query the database to verify user credentials
  const query = `SELECT * FROM login WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// ********************************************ADMIN PANEL***********************
app.get(("/propertydata", (req, res) => {
  const data = { PropertyID, Ad_Type, count, Property_Name, Property_Title }
}))


// ************************Table With Id ********************
app.post('/staticdata', async (req, res) => {
  const tn = req.body.tablename
  let sql = `SELECT * FROM ${tn}`
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result)
  })
})

app.get('/homestatic', async (req, res) => {
  let sql = `SELECT * FROM homepagedb`
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result)
  })
})

app.get('/blogstatic', async (req, res) => {
  let sql = `SELECT * FROM blog`
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result)
  })
})

app.post('/staticdatawithid', async (req, res) => {
  const tn = req.body.tablename
  const anyid = req.body.id
  let sql = `SELECT * FROM ${tn} where ID= ${anyid}`
  const result = await singleQuery(sql);
  if (result) {
    res.json(result)
  } else {
    console.log("no data");
  }
})




app.post('/deletewithid', async (req, res) => {
  const tn = req.body.tablename
  const anyid = req.body.id
  let sql = `delete  FROM ${tn} where ID= ${anyid}`
  const result = await singleQuery(sql);
  if (result) {
    res.json({ msg: "200" })
  } else {
    console.log("no data");
  }
})
// *******************Update About Us******************
const fields1 = [
  { name: 'bg1', maxCount: 1 },
  { name: 'bg2', maxCount: 1 },
  { name: 'icon1', maxCount: 1 },
  { name: 'icon2', maxCount: 1 },
  { name: 'icon3', maxCount: 1 },
  { name: 'icon4', maxCount: 1 },
  { name: 'icon5', maxCount: 1 },
  { name: 'icon6', maxCount: 1 },
  { name: 'icon7', maxCount: 1 },
  { name: 'icon8', maxCount: 1 },
  { name: 'icon9', maxCount: 1 },
];

app.post('/updateabout', upload.fields(fields1), (req, res) => {
  const {
    bg1,
    bg2,
    icon1,
    icon2,
    icon3,
    icon4,
    icon5,
    icon6,
    icon7,
    icon8,
    icon9,
    // ... other fields
  } = req.files;


  // Assuming you want to get the file paths
  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  const bg2FilePath = bg2 ? bg2[0].filename : req.body.bg2;

  const icon1FilePath = icon1 ? icon1[0].filename : req.body.icon1;
  const icon2FilePath = icon2 ? icon2[0].filename : req.body.icon2;
  const icon3FilePath = icon3 ? icon3[0].filename : req.body.icon3;
  const icon4FilePath = icon4 ? icon4[0].filename : req.body.icon4;
  const icon5FilePath = icon5 ? icon5[0].filename : req.body.icon5;
  const icon6FilePath = icon6 ? icon6[0].filename : req.body.icon6;
  const icon7FilePath = icon7 ? icon7[0].filename : req.body.icon7;
  const icon8FilePath = icon8 ? icon8[0].filename : req.body.icon8;
  const icon9FilePath = icon9 ? icon9[0].filename : req.body.icon9;





  const sql = `UPDATE aboutuspagedb
SET
sec1bgimage = "${bg1FilePath}",
sec1heading = "${req.body.sec1heading}",
sec1discription = "${req.body.sec1discription}",
  sec2discription = "${req.body.sec2discription}",
  sec3heading = "${req.body.sec3heading}",
  sec3subheading1 = "${req.body.sec3subheading1}",
  sec3discription1 = "${req.body.sec3discription1}",
  sec3subheading2 = "${req.body.sec3subheading2}",


  sec3discription2 =  "${req.body.sec3discription2}",
  sec3image =  "${bg2FilePath}",
  sec4number1 =  "${req.body.sec4number1}",
  sec4heading1 =  "${req.body.sec4heading1}",
  sec4discription1 =  "${req.body.sec4discription1}",

  sec4number2 = "${req.body.sec4number2}",
  sec4heading2 =  "${req.body.sec4heading2}",
  sec4discription2 =  "${req.body.sec4discription2}",
  sec4number3 =  "${req.body.sec4number3}",
  sec4heading3 =  "${req.body.sec4heading3}",
  sec4discription3 =  "${req.body.sec4discription3}",
  sec5heading =  "${req.body.sec5heading}",
  sec5icon =  "${icon1FilePath}",
  sec5discription =  "${req.body.sec5discription}",
  sec6heading =  "${req.body.sec6heading}",
  sec6discription =  "${req.body.sec6discription}",
  sec6chackboxtext1 =  "${req.body.sec6chackboxtext1}",
  sec6chackboxtext2 =  "${req.body.sec6chackboxtext2}",
  sec6button =  "${req.body.sec6button}",
  sec5icon2 =  "${icon2FilePath}",
  sec5discription2 =  "${req.body.sec5discription2}",
  sec5icon3 =  "${icon3FilePath}",
  sec5discription3 =  "${req.body.sec5discription3}",
  sec5icon4 =  "${icon4FilePath}",
  sec5discription4 =  "${req.body.sec5discription4}",
  sec5icon5 =  "${icon5FilePath}",
  sec5discription5 =  "${req.body.sec5discription5}",
  sec5icon6 =  "${icon6FilePath}",
  sec5discription6 =  "${req.body.sec5discription6}",
  sec5icon7 =  "${icon7FilePath}",
  sec5discription7 =  "${req.body.sec5discription7}",
  sec5icon8 =  "${icon8FilePath}",
  sec5discription8 =  "${req.body.sec5discription6}",
  sec5icon9 =  "${icon9FilePath}",
  sec5discription9 =  "${req.body.sec5discription9}"
WHERE ID = '1';
`
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })
});

// *********************Update Advisory Page*************
const fields2 = [
  { name: 'bg1', maxCount: 1 },
  { name: 'bg2', maxCount: 1 },
  { name: 'bg3', maxCount: 1 },
  { name: 'bg4', maxCount: 1 },

];

app.post('/updateadvisory', upload.fields(fields2), (req, res) => {
  const { bg1, bg2, bg3, bg4 } = req.files;

  // Assuming you want to get the file paths
  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  const bg2FilePath = bg2 ? bg2[0].filename : req.body.bg2;
  const bg3FilePath = bg3 ? bg3[0].filename : req.body.bg3;
  const bg4FilePath = bg4 ? bg4[0].filename : req.body.bg4;

  const sql = `UPDATE advisorypagedb SET sec1bgimage = "${bg1FilePath}",sec1heading = "${req.body.sec1heading}",sec1discription = "${req.body.sec1discription}",
  sec2heading = "${req.body.sec2heading}",sec2subheading1 = "${req.body.sec2subheading1}",sec2discription1 = "${req.body.sec2discription1}",
  sec2subheading2 = "${req.body.sec2subheading2}",sec2discription2 = "${req.body.sec2discription2}",sec2subheading3 =  "${req.body.sec2subheading3}",
  sec2discription3 =  "${req.body.sec2discription3}",sec2subheading4 =  "${req.body.sec2subheading4}",sec2discription4 =  "${req.body.sec2discription4}",
  sec3heading =  "${req.body.sec3heading}",sec3subheading1 = "${req.body.sec3subheading1}",sec3subheading2 =  "${req.body.sec3subheading2}",
  sec3subheading3 =  "${req.body.sec3subheading3}",sec3subheading4 =  "${req.body.sec3subheading4}",sec3subheading5 =  "${req.body.sec3subheading5}",
  sec4heading =  "${req.body.sec4heading}",sec4subheading1 =  "${req.body.sec4subheading1}",sec4subheading2 =  "${req.body.sec4subheading2}",
  sec4subheading3 =  "${req.body.sec4subheading3}",sec4subheading4 =  "${req.body.sec4subheading4}",sec4subheading5 =  "${req.body.sec4subheading5}",
  sec5heading =  "${req.body.sec5heading}",sec5button =  "${req.body.sec5button}",sec2image =  "${bg2FilePath}",sec3image =  "${bg3FilePath}",
  sec4image =  "${bg4FilePath}" WHERE ID = '1'`

  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })

});

// ***********************Update Sell Page******************
const fields3 = [
  { name: 'bg1', maxCount: 1 },
  { name: 'bg2', maxCount: 1 },
];

app.post('/updatesell', upload.fields(fields3), (req, res) => {
  const {
    bg1,
    bg2,

  } = req.files;


  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  const bg2FilePath = bg2 ? bg2[0].filename : req.body.bg2;

  const sql = `UPDATE sellpagedb
SET
sec1bgimage = "${bg1FilePath}",
sec1heading = "${req.body.sec1heading}",
sec1discription = "${req.body.sec1discription}",
  sec2heading = "${req.body.sec2heading}",
  sec2button = "${req.body.sec2button}",
  sec3heading = "${req.body.sec3heading}",
  sec3discription = "${req.body.sec3discription}",
  sec3image = "${bg2FilePath}"
WHERE ID = '1';
`



  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })

});

// ***********************Update Mort-Services****************
const fields4 = [
  { name: 'bg1', maxCount: 1 },
  { name: 'bg2', maxCount: 1 },
  { name: 'bg3', maxCount: 1 },
];

app.post('/updatemort', upload.fields(fields4), (req, res) => {

  const {
    bg1,
    bg2,
    bg3

  } = req.files;


  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  const bg2FilePath = bg2 ? bg2[0].filename : req.body.bg2;
  const bg3FilePath = bg3 ? bg3[0].filename : req.body.bg3;
  const sql = `UPDATE mortgageservicespagedb
SET
sec1bgimage = "${bg1FilePath}",
sec1heading = "${req.body.sec1heading}",
sec1discription = "${req.body.sec1discription}",
  sec2heading = "${req.body.sec2heading}",
  sec2discription = "${req.body.sec2discription}",
  sec3heading = "${req.body.sec3heading}",
  sec3subhead1 = "${req.body.sec3subhead1}",

  sec3subdesc1 = "${req.body.sec3subdesc1}",
  sec3subhead2 = "${req.body.sec3subhead2}",
  sec3subdesc2 = "${req.body.sec3subdesc2}",
  sec3subhead3 = "${req.body.sec3subhead3}",
  sec3subdesc3 = "${req.body.sec3subdesc3}",

  sec3subhead4 = "${req.body.sec3subhead4}",
  sec3subdesc4 = "${req.body.sec3subdesc4}",
  sec3subhead5 = "${req.body.sec3subhead5}",
  sec3subdesc5 = "${req.body.sec3subdesc5}",

  sec4heading = "${req.body.sec4heading}",
  sec4subhead1 = "${req.body.sec4subhead1}",
  sec4subheaddesc1 = "${req.body.sec4subheaddesc1}",

  sec4subhead2 = "${req.body.sec4subhead2}",
  sec4subheaddesc2 = "${req.body.sec4subheaddesc2}",
  sec4subhead3 = "${req.body.sec4subhead3}",
  sec4subheaddesc3 = "${req.body.sec4subheaddesc3}",

  sec4subhead4 = "${req.body.sec4subhead4}",
  sec4subheaddesc4 = "${req.body.sec4subheaddesc4}",

  sec4subhead5 = "${req.body.sec4subhead5}",
  sec4subheaddesc5 = "${req.body.sec4subheaddesc5}",

  sec5button = "${req.body.sec5button}",
  sec6heading = "${req.body.sec6heading}",

  sec3image = "${bg2FilePath}",
  sec4image = "${bg3FilePath}"
WHERE ID = '1';
`


  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })

});



const fields9 = [
  { name: 'bg1', maxCount: 1 }
];
// UPDATE MEMBER 

app.post('/updatemember', upload.fields(fields9), (req, res) => {
  const { bg1 } = req.files;
  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  const sql = `UPDATE ourteam SET image = "${bg1FilePath}", Name = '${req.body.Name}', Job = "${req.body.Job}", email = "${req.body.email}" WHERE ID =" ${req.body.id}"`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.json({ msg: "200" });
    }
  });
});


// ##################ADD MEMBER################## 
const fields11 = [
  { name: 'bg1', maxCount: 1 },

];
app.post('/addteam', upload.fields(fields11), (req, res) => {

  let data = {
    Name: req.body.Name,
    Job: req.body.Job,
    email: req.body.email,
    image: req.body.image,
  }
  // Use parameterized query to prevent SQL injection
  const sql = 'insert into ourteam set ?';

  connection.query(sql, data, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: 'Internal Server Error' });
      return;
    }

    if (result.affectedRows > 0) {
      res.json({ msg: '200' });
    } else {
      res.status(404).json({ msg: 'Data not found' });
    }
  });
});
// *********************Update Why Us Page***************

const fields5 = [
  { name: 'bg1', maxCount: 1 },
  { name: 'icon1', maxCount: 1 },
  { name: 'icon2', maxCount: 1 },
  { name: 'icon3', maxCount: 1 },
  { name: 'icon4', maxCount: 1 },
  { name: 'icon5', maxCount: 1 },
  { name: 'icon6', maxCount: 1 },
  { name: 'icon7', maxCount: 1 },
];

app.post('/updatewhyus', upload.fields(fields5), (req, res) => {

  const {
    bg1,
    icon1,
    icon2,
    icon3,
    icon4,
    icon5,
    icon6,
    icon7,

  } = req.files;


  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  const icon1FilePath = icon1 ? icon1[0].filename : req.body.icon1;
  const icon2FilePath = icon2 ? icon2[0].filename : req.body.icon2;
  const icon3FilePath = icon3 ? icon3[0].filename : req.body.icon3;
  const icon4FilePath = icon4 ? icon4[0].filename : req.body.icon4;
  const icon5FilePath = icon5 ? icon5[0].filename : req.body.icon5;
  const icon6FilePath = icon6 ? icon6[0].filename : req.body.icon6;
  const icon7FilePath = icon7 ? icon7[0].filename : req.body.icon7;

  const sql = `UPDATE whyuspagedb
SET
sec1bgimage = "${bg1FilePath}",
sec1heading = "${req.body.sec1heading}",
sec1discription = '${req.body.sec1discription}',
  sec2heading = "${req.body.sec2heading}",
  sec2iconheading = "${req.body.sec2iconheading}",
  sec2icondiscription = "${req.body.sec2icondiscription}",
  sec2iconheading2 = "${req.body.sec2iconheading2}",

  sec2icondiscription2 = "${req.body.sec2icondiscription2}",
  sec2iconheading3 = "${req.body.sec2iconheading3}",
  sec2icondiscription3 = "${req.body.sec2icondiscription3}",
  sec2iconheading4 = "${req.body.sec2iconheading4}",
  sec2icondiscription4 = "${req.body.sec2icondiscription4}",

  sec2iconheading5 = "${req.body.sec2iconheading5}",
  sec2icondiscription5 = "${req.body.sec2icondiscription5}",
  sec2iconheading6 = "${req.body.sec2iconheading6}",
  sec2icondiscription6 = "${req.body.sec2icondiscription6}",

  sec2iconheading7 = "${req.body.sec2iconheading7}",
  sec2icondiscription7 = "${req.body.sec2icondiscription7}",

  sec2icon = "${icon1FilePath}",

  sec2icon2 = "${icon2FilePath}",
  sec2icon3 = "${icon3FilePath}",
  sec2icon4 = "${icon4FilePath}",
  sec2icon5 = "${icon5FilePath}",

  sec2icon6 = "${icon6FilePath}",
  sec2icon7 = "${icon7FilePath}"
WHERE ID = '1';
`

  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })

});


// *********************Update Contact Page***************
const fields6 = [
  { name: 'bg1', maxCount: 1 },
  { name: 'icon1', maxCount: 1 },
  { name: 'icon2', maxCount: 1 },
  { name: 'icon3', maxCount: 1 },

];

app.post('/updatecontact', upload.fields(fields6), (req, res) => {

  const {
    bg1,
    icon1,
    icon2,
    icon3,
  } = req.files;


  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  const icon1FilePath = icon1 ? icon1[0].filename : req.body.icon1;
  const icon2FilePath = icon2 ? icon2[0].filename : req.body.icon2;
  const icon3FilePath = icon3 ? icon3[0].filename : req.body.icon3;



  const sql = `UPDATE contactuspagedb
SET
sec1bgimage = "${bg1FilePath}",
sec1heading = "${req.body.sec1heading}",
sec1discription = '${req.body.sec1discription}',

sec2callicon = "${icon1FilePath}",
  sec2calltitle = "${req.body.sec2calltitle}",
  sec2callnumber = "${req.body.sec2callnumber}",

  sec2emailicon = "${icon2FilePath}",

  sec2emailtitle = "${req.body.sec2emailtitle}",
  sec2emailaddress = "${req.body.sec2emailaddress}",

  sec2locationicon = "${icon3FilePath}",
  sec2locationtitle = "${req.body.sec2locationtitle}",
  sec2locationaddress = "${req.body.sec2locationaddress}",

  sec2officehourstitle = '${req.body.sec2officehourstitle}',
  sec2officehoursdiscription = "${req.body.sec2officehoursdiscription}",
  sec4button = "${req.body.sec4button}",
  maploaction = "${req.body.maploaction}"
WHERE ID = '1';
`

  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })

});

// *********************Update Join-Us Page***************
const fields7 = [
  { name: 'bg1', maxCount: 1 },
  { name: 'icon1', maxCount: 1 },
  { name: 'icon2', maxCount: 1 },
  { name: 'icon3', maxCount: 1 },

];


app.post('/joinusupdate', upload.fields(fields7), (req, res) => {

  const {
    bg1,
    icon1,
    icon2,
    icon3,
  } = req.files;


  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  const icon1FilePath = icon1 ? icon1[0].filename : req.body.icon1;
  const icon2FilePath = icon2 ? icon2[0].filename : req.body.icon2;
  const icon3FilePath = icon3 ? icon3[0].filename : req.body.icon3;



  const sql = `UPDATE joinuspagedb 
SET
sec1bgimage = "${bg1FilePath}",
sec1heading = "${req.body.sec1heading}",
sec1discription = '${req.body.sec1discription}',

sec2logo1 = "${icon1FilePath}",
  sec2calltitle = "${req.body.sec2calltitle}",
  sec2callnumber = "${req.body.sec2callnumber}",

  sec2logo2 = "${icon2FilePath}",

  sec2emailheading = "${req.body.sec2emailtitle}",
  sec2emailaddress = "${req.body.sec2emailaddress}",

  sec2logo3 = "${icon3FilePath}",
  sec2officehoursheading = "${req.body.sec2locationtitle}",
  sec2officehoursmfopeningtime = "${req.body.sec2officehoursmfopeningtime}",

  sec2officehoursmfclosingtime = '${req.body.sec2officehoursmfclosingtime}',

  sec2officehourssopeningtime = "${req.body.sec2officehourssopeningtime}",
  sec2officehourssclosingtime = "${req.body.sec2officehourssclosingtime}",
  sec3heading = "${req.body.sec3heading}",
  sec3button = "${req.body.sec3button}"
WHERE ID = '1';
`

  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })

});

// *********************Update Privacy Page***************
app.post('/updateprivacy', (req, res) => {
  const privacytext = req.body.privacytext;

  // Use parameterized query to prevent SQL injection
  const sql = 'UPDATE privacy SET privacytext = ? WHERE ID = 1';

  connection.query(sql, [privacytext], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: 'Internal Server Error' });
      return;
    }

    if (result.affectedRows > 0) {

      res.json({ msg: '200' });
    } else {
      res.status(404).json({ msg: 'Data not found' });
    }
  });
});

// *********************Update F&Q Page***************
app.post('/updatefandq', (req, res) => {
  const { heading, question, answer, id } = req.body;
  // Use parameterized query to prevent SQL injection
  const selectSql = 'SELECT * FROM fandqdb WHERE id = ?';
  connection.query(selectSql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length === 0) {
      const insertData = { question_number: null, question_text: question, answer_text: answer };

      const insertSql = 'INSERT INTO fandqdb SET ?';
      connection.query(insertSql, insertData, (err, result) => {

        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Record inserted successfully' });
      });
    } else {
      const insertData = { question_number: null, question_text: question, answer_text: answer };
      const updateSql = 'UPDATE fandqdb SET ? WHERE id = ?';
      connection.query(updateSql, [insertData, id], (err, result) => {

        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json({ message: 'Record updated successfully' });
      });
    }
  });
});

// *********************Update New Devolopment Page***************
const fields10 = [
  { name: 'bg1', maxCount: 1 },
  { name: 'bg2', maxCount: 1 },
];

app.post('/updatepman', upload.fields(fields10), (req, res) => {
  const {
    bg1,
    bg2
  } = req.files;
  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  const bg2FilePath = bg2 ? bg2[0].filename : req.body.bg2;


  const sql = `UPDATE propertymanagementpagedb
SET
sec1bgimage = "${bg1FilePath}",
sec1heading = "${req.body.sec1heading}",
sec1discription = '${req.body.sec1discription}',
sec2discription = "${req.body.sec2discription}",

sec2image = "${bg2FilePath}",
sec3heading = "${req.body.sec3heading}",
sec3discription = "${req.body.sec3discription}",
sec3button = "${req.body.sec3button}"
  
WHERE ID = '1';
`

  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })

});

// **********************Insert Blog**********************
const blogfields = [
  { name: 'bg1', maxCount: 1 },
];

app.post('/bloginsert', upload.fields(blogfields), (req, res) => {
  const { bg1 } = req.files;
  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  let data = {
    bgimage: bg1FilePath,
    blogtext: req.body.blogtext
  }
  // Use parameterized query to prevent SQL injection
  const sql = `insert into blog set ?`;

  connection.query(sql, data, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal Server Error" });
      return;
    }
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    } else {
      res.status(404).json({ msg: "Not Found" });
    }
  });
});


// **********************Update Blog**********************
app.post('/updateblogdb', upload.fields(blogfields), (req, res) => {
  const id = req.body.blogid;
  const bg1 = req.files;
  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;

  // Use parameterized query to prevent SQL injection
  const sql = `UPDATE blog SET bgimage = ?, blogtext = ? WHERE ID = ?;`;

  connection.query(sql, [bg1FilePath, req.body.blogtext, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal Server Error" });
      return;
    }
    if (result.affectedRows > 0) {
      res.json({ msg: "200" });
    } else {
      res.status(404).json({ msg: "Not Found" });
    }
  });
});


// ***************************Blog Data With ID For Updating*****************
app.post('/blogdata', (req, res) => {
  const id = req.body.id;
  const sql = `select* from blog where ID= ${id}`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  })
})

// ***************************Update Cookie*************************
app.post('/updatecookie', (req, res) => {
  const cookietext = req.body.cookietext;

  // Use parameterized query to prevent SQL injection
  const sql = 'UPDATE cookiepagedb SET  cookietext= ? WHERE ID = 1';

  connection.query(sql, [cookietext], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: 'Internal Server Error' });
      return;
    }

    if (result.affectedRows > 0) {
      res.json({ msg: '200' });
    } else {
      res.status(404).json({ msg: 'Data not found' });
    }
  });
});

// ***************************Update Home*************************

const fields = [
  { name: 'bg1', maxCount: 1 },
  { name: 'bg2', maxCount: 1 },
  { name: 'bg3', maxCount: 1 },
  { name: 'bg4', maxCount: 1 },
  { name: 'bg5', maxCount: 1 },
  { name: 'icon1', maxCount: 1 },
  { name: 'icon2', maxCount: 1 },
  { name: 'icon3', maxCount: 1 },
];

app.post('/updatehome', upload.fields(fields), (req, res) => {

  const {
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    icon1,
    icon2,
    icon3,
    // ... other fields
  } = req.files;

  // Assuming you want to get the file paths
  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  const bg2FilePath = bg2 ? bg2[0].filename : req.body.bg2;
  const bg3FilePath = bg3 ? bg3[0].filename : req.body.bg3;
  const bg4FilePath = bg4 ? bg4[0].filename : req.body.bg4;
  const bg5FilePath = bg5 ? bg5[0].filename : req.body.bg5;
  const icon1FilePath = icon1 ? icon1[0].filename : req.body.icon1;
  const icon2FilePath = icon2 ? icon2[0].filename : req.body.icon2;
  const icon3FilePath = icon3 ? icon3[0].filename : req.body.icon3;
  const sql = `UPDATE homepagedb
SET
  sec1bg = "${bg1FilePath}",
  sec1heading = "${req.body.sec1heading}",
  sec2heading = "${req.body.sec2heading}",
  sec3heading = "${req.body.sec3heading}",
  sec3description = "${req.body.sec3description}",
  sec4heading = "${req.body.sec4heading}",
  sec4subheading = "${req.body.sec4subheading}",
  sec4button = "${req.body.sec4button}",


  sec5number1 =  "${req.body.sec5number1}",
  sec5numberdiscription1 =  "${req.body.sec5numberdiscription1}",
  sec5number2 =  "${req.body.sec5number2}",
  sec5numberdiscription2 =  "${req.body.sec5numberdiscription2}",
  sec5number3 =  "${req.body.sec5number3}",
  sec5numberdiscription3 = "${req.body.sec5numberdiscription3}",
  sec5heading =  "${req.body.sec5heading}",
  sec5discription =  "${req.body.sec5discription}",
  sec6heading =  "${req.body.sec6heading}",
  sec6logo =  "${icon1FilePath}",
  sec6logoheading =  "${req.body.sec6logoheading}",
  sec6logodiscription =  "${req.body.sec6logodiscription}",
  sec7heading =  "${req.body.sec7heading}",
  sec7button =  "${req.body.sec7button}",
  sec8heading =  "${req.body.sec8heading}",

  sec9heading =  "${req.body.sec9heading}",
  sec9discription =  "${req.body.sec9discription}",
  sec9button =  "${req.body.sec9button}",
  sec9bgimg =  "${bg5FilePath}",
  sec9chackboxtext =  "${req.body.sec4button}",
  sec3image =  "${bg2FilePath}",
  sec4bgimage =  "${bg3FilePath}",
  sec5image =  "${bg4FilePath}",
  sec6logo2 =  "${icon1FilePath}",
  sec6logoheading2 =  "${req.body.sec6logoheading2}",
  sec6logodiscription2 =  "${req.body.sec6logodiscription2}",
  sec6logo3 =  "${icon1FilePath}",
  sec6logoheading3 =  "${req.body.sec6logoheading3}",
  sec6logodiscription3 =  "${req.body.sec6logodiscription3}"
WHERE ID = '1';
`
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })

});

// ****************************Update Privacy*********************
app.post('/updateprivacy', (req, res) => {
  const privacytext = req.body.privacytext;

  // Use parameterized query to prevent SQL injection
  const sql = 'UPDATE privacy SET privacytext = ? WHERE ID = 1';

  connection.query(sql, [privacytext], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: 'Internal Server Error' });
      return;
    }

    if (result.affectedRows > 0) {

      res.json({ msg: '200' });
    } else {
      res.status(404).json({ msg: 'Data not found' });
    }
  });
});

// ****************************Update Buy*********************
app.post('/updatebuy', (req, res) => {
  const sql = `UPDATE buypagedb SET sec1heading = "${req.body.sec1heading}" WHERE ID = '1';`
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })

});

// ****************************Update Rent********************
app.post('/updaterent', (req, res) => {
  const sql = `UPDATE rentpagedb SET sec1heading = "${req.body.sec1heading}" WHERE ID = '1';`
  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })
});


// ****************************Update New Developments*******************
app.post('/updateNewdevelopment', (req, res) => {
  const newtext = req.body.newtext;

  // Use parameterized query to prevent SQL injection
  const sql = 'UPDATE newdevelopmentpagedb SET  newtext= ? WHERE ID = 1';

  connection.query(sql, [newtext], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: 'Internal Server Error' });
      return;
    }

    if (result.affectedRows > 0) {

      res.json({ msg: '200' });
    } else {
      res.status(404).json({ msg: 'Data not found' });
    }
  });
});

// ****************************Update OutTeam*******************
const teamfields = [
  { name: 'bg1', maxCount: 1 },
];
app.post('/ourteamupdate', upload.fields(teamfields), (req, res) => {
  const {
    bg1
  } = req.files;
  const bg1FilePath = bg1 ? bg1[0].filename : req.body.bg1;
  const sql = `UPDATE ourteampagedb
SET
sec1bgimage = "${bg1FilePath}",
sec1heading = '${req.body.sec1heading}',
sec1discription = "${req.body.sec1discription}",
sec2heading = "${req.body.sec2heading}"
WHERE ID = '1';
`

  connection.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {

      res.json({ msg: "200" });
    }
  })

});

// ************************************************Latest Add End************************************

app.get('/allprorent', async (req, res) => {
  let sql = `SELECT * FROM basicpropertiesdetails AS bpd, unitdetails ul, listingagent la, propertiesimages pi, propertyarea pa, otherimpdata as oi 
  WHERE bpd.Ad_Type = 'Rent' 
  AND bpd.count = ul.count 
  AND bpd.count = pa.count 
  AND bpd.count = pi.count 
  AND bpd.count = la.count 
  AND bpd.count = oi.count `
  const result = await singleQuery(sql);
  if (result) {
    res.json(result)
  } else {
    console.log("no data");
  }
})


// app.get('/allprosale', async (req, res) => {
//   let sql = `SELECT * FROM basicpropertiesdetails AS bpd, unitdetails ul, listingagent la, propertiesimages pi, propertyarea pa WHERE bpd.Ad_Type = 'sale' AND bpd.count = ul.count AND bpd.count = pa.count AND bpd.count = pi.count AND bpd.count = la.count `
//   const result = await singleQuery(sql);
//   if (result) {
//     res.json(result)
//   } else {
//     console.log("no data");
//   }
// })
app.get('/allprosale', async (req, res) => {
  let sql = `SELECT * FROM basicpropertiesdetails AS bpd, unitdetails ul, listingagent la, propertiesimages pi, propertyarea pa, otherimpdata as oi 
  WHERE bpd.Ad_Type = 'sale' 
  AND bpd.count = ul.count 
  AND bpd.count = pa.count 
  AND bpd.count = pi.count 
  AND bpd.count = la.count 
  AND bpd.count = oi.count
  `
  const result = await singleQuery(sql);
  if (result) {
    res.json(result)
  } else {
    console.log("no data");
  }
})

app.get('/datafetch1/:name', async (req, res) => {
  //  BasicPropertiesDetails  // UnitDetails // PropertyArea
  const adtype = req.params.name;

  // Use parameterized query to prevent SQL injection
  let sql = `SELECT * FROM basicpropertiesdetails AS bpd, unitdetails ul, listingagent la, propertiesimages pi, propertyarea pa WHERE bpd.Ad_Type = ? AND bpd.count = ul.count AND bpd.count = pa.count AND bpd.count = pi.count AND bpd.count = la.count`;


  try {
    const result = await singleQuery(sql, [adtype]); // assuming singleQuery supports parameterized queries
    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).send("No data found");
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send("Internal Server Error");
  }
})
app.get('/meetmyteam/:name', (req, res) => {
  const agentEmail = req.params.name;

  // Validate and sanitize agentEmail here
  // ...

  // Escape the variable to avoid SQL injection
  const escapedEmail = connection.escape(agentEmail);
  let sql = `SELECT * FROM ourteam WHERE email = ${escapedEmail}`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Database query failed:', error);
      return res.status(500).send('Internal server error');
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).send('No data found for the specified agent');
    }
  });
});



app.get('/meetmyteam1', async (req, res) => {
  let sql = `select * from ourteam`
  const result = await singleQuery(sql);
  if (result) {
    res.json(result)
  } else {
    console.log("no data");
  }
})


// For Common Emails  Page 
app.post('/demodb', (req, res) => {

  let { name, email, phoneNumber, pageUrl } = req.body;


  let data = {
    Name: req.body.name,
    Phone: req.body.phoneNumber,
    email: req.body.email,
    FromPage: req.body.pageUrl
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rainehorne081@gmail.com',
      pass: 'dcclhruqsxdktucy'
    }
  });
  // Object to store any NaN value fields
  let nanValues = {};

  // Check each field for NaN values
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'number' && isNaN(value)) { // Check for NaN
      nanValues[key] = 'NaN';
    }
  });

  // If any NaN values were found, return them in the response
  if (Object.keys(nanValues).length > 0) {
    return res.status(400).json({
      error: "Invalid data: NaN values found",
      nanValues: nanValues
    });
  }

  const customMessage = `Dear Raine & Horne,
,\n\n We have received an inquiry from ${pageUrl} Page : \n\n Name: ${name} \n\n Phone Number: ${phoneNumber} \n\n Email: ${email} \n\n Thank you `;

  const mailOptions = {
    from: req.body.email,
    to: 'harpreet13108159@gmail.com',
    subject: `Inquiry from ${req.body.about}`,
    text: customMessage
  };



  let sql = `insert into commondb set ?`;
  connection.query(sql, data, async (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Data is inserted");

    if (results.affectedRows > 0) {
      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        res.status(200).send('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      }
    }
  });


})



//For Internal Form
app.post('/FormInternal', (req, res) => {
  const { name, Email, phoneNumber, dialCode, PropertyName, page } = req.body;

  // Constructing data object
  const data = {
    Name: name,
    Phone: dialCode + phoneNumber,
    email: Email,
    FromPage: page,
    Propertname: PropertyName
  };

  // Check for NaN or empty string values
  const nanValues = {};
  Object.entries(data).forEach(([key, value]) => {
    if ((typeof value === 'number' && isNaN(value)) || (typeof value === 'string' && !value.trim())) {
      nanValues[key] = 'NaN or empty string';
    }
  });

  // If any NaN or empty string values were found, return them in the response
  if (Object.keys(nanValues).length > 0) {
    return res.status(400).json({
      error: 'Invalid data: NaN or empty string values found',
      nanValues: nanValues
    });
  }

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });

  // Email message
  const customMessage = `Dear Raine & Horne,\n\nWe have received an inquiry from ${page}:\n\nName: ${name}\n\nPhone Number: ${dialCode}${phoneNumber}\n\nEmail: ${Email}\n\nProperty Name: ${PropertyName}\n\nThank you`;

  const mailOptions = {
    from: req.body.Email,
    to: 'harpreet13108159@gmail.com',
    subject: `Inquiry from ${req.body.page}`,
    text: customMessage
  };

  // MySQL query to insert data
  const sql = 'INSERT INTO internalform SET ?';
  connection.query(sql, data, async (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: err.message });
    }

    console.log('Data is inserted');

    if (results.affectedRows > 0) {
      try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      }
    }
  });
});


app.get('/datafetchone', async (req, res) => {
  //  BasicPropertiesDetails  // UnitDetails // PropertyArea
  const adtype = req.params.name
  let sql = ` select *from BasicPropertiesDetails as bpd,UnitDetails ul , ListingAgent as la,PropertiesImages as pi , PropertyArea as pa 
   where bpd.count=1 and bpd.count=ul.count and bpd.count=pa.count and bpd.count=pi.count and bpd.count=la.count`
  const result = await singleQuery(sql);
  if (result) {
    res.json(result)
  } else {
    console.log("no data");
  }
})


// Function to execute database queries using promises
function queryDatabase(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function singleQuery(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}


app.post('/saleform', (req, res) => {
  let data = {
    Name: req.body.name,
    Phone: req.body.dialCode + req.body.phoneNumber,
    email: req.body.email,
    salerent: req.body.saleDrop,
    location: req.body.location,
    propertyType: req.body.proType
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });
  // Object to store any NaN value fields
  let nanValues = {};

  // Check each field for NaN values
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'number' && isNaN(value)) { // Check for NaN
      nanValues[key] = 'NaN';
    }
  });

  // If any NaN values were found, return them in the response
  if (Object.keys(nanValues).length > 0) {
    return res.status(400).json({
      error: "Invalid data: NaN values found",
      nanValues: nanValues
    });
  }

  const customMessage = `Dear Raine & Horne,
 ,\n\n We have received an inquiry from About Page : \n\n Name: ${req.body.name} \n\n Phone Number: ${req.body.dialCode}${req.body.phoneNumber} \n\n Email: ${req.body.email}  \n\n Property For: ${req.body.saleDrop} \n\n Location: ${req.body.location} \n\n Property Type: ${req.body.proType} \n\n Thank you `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'marketing@rhdubai.ae',
    subject: `Inquiry from ${req.body.about}`,
    text: customMessage
  };



  let sql = `insert into saleform set ?`;
  connection.query(sql, data, async (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Data is inserted");

    if (results.affectedRows > 0) {
      try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      }
    }
  });


});




app.get("/datafetch/:name", async (req, res) => {
  //  BasicPropertiesDetails  // UnitDetails // PropertyArea
  const adtype = req.params.name;
  let sql = ` select *from BasicPropertiesDetails as bpd,UnitDetails ul , ListingAgent as la,PropertiesImages as pi , PropertyArea as pa 
   where bpd.Ad_Type='${adtype}' and bpd.count=ul.count and bpd.count=pa.count and bpd.count=pi.count and bpd.count=la.count`;
  const result = await singleQuery(sql);
  if (result) {
    res.json(result);
  } else {
    console.log("no data");
  }
});


app.get("/singleproperty1/:id", async (req, res) => {
  const count = parseInt(req.params.id, 10); // Ensure the parameter is an integer

  if (isNaN(count)) {
    return res.status(400).send("Invalid PropertyID");
  }

  // Use parameterized query to prevent SQL injection
  let sql = `SELECT * FROM basicpropertiesdetails AS bpd, unitdetails AS ul, propertylocation AS pl, webremarks AS wr, listingagent AS la, propertiesimages AS pi, facilities AS fc, propertyarea AS pa 
             WHERE bpd.PropertyID = ? AND ul.PropertyID = ? AND pa.PropertyID = ? AND pl.PropertyID = ? AND pi.PropertyID = ? AND la.PropertyID = ? AND wr.PropertyID = ? AND fc.PropertyID = ?`;

  connection.query(sql, Array(8).fill(count), (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }

    if (results.length === 0) {
      return res.status(404).send("No data found");
    }

    res.json(results);
  });
});




app.post('/userinfo', async (req, res) => {
  let { name, email, listingType, Propertyaddress, dialCode, phoneNumber } = req.body;


  let data = {
    Name: req.body.name,
    Email: req.body.email,

    Phone: req.body.phoneNumber,

    ListingType: req.body.listingType,
    PropertyAddress: req.body.Propertyaddress,

  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  });
  // Object to store any NaN value fields
  let nanValues = {};

  // Check each field for NaN values
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'number' && isNaN(value)) { // Check for NaN
      nanValues[key] = 'NaN';
    }
  });

  // If any NaN values were found, return them in the response
  if (Object.keys(nanValues).length > 0) {
    return res.status(400).json({
      error: "Invalid data: NaN values found",
      nanValues: nanValues
    });
  }

  const customMessage = `Dear Raine & Horne,
 ,\n\n We have received an inquiry from: \n\n Name: ${name} \n\n Phone Number: ${phoneNumber} \n\n Email: ${email} \n\n Listing type : ${listingType} \n\n Address :  ${Propertyaddress} \n\n Thank you `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'marketing@rhdubai.ae',
    subject: 'Inquiry for Free Apraisal',
    text: customMessage
  };


  let sql = 'INSERT INTO userinfo SET ?';

  connection.query(sql, data, async (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Data is inserted");

    if (results.affectedRows > 0) {
      try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      }
    }
  });
});


// app.post('/newdevform', async (req, res) => {
//   let { name, email,dialCode, phoneNumber,propertyname } = req.body;
//   console.log("coming");
//   let data = {
//     Name: req.body.name,
//     Email: req.body.email,
//     Phone: req.body.dialCode + req.body.phoneNumber,
//     propertyname:req.body.propertyname
//   }

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'millionairesthought01@gmail.com',
//       pass: `utyc fgcz gsyp clql`
//     }
//   });
//   // Object to store any NaN value fields
//   let nanValues = {};

//   // Check each field for NaN values
//   Object.entries(data).forEach(([key, value]) => {
//     if (typeof value === 'number' && isNaN(value)) { // Check for NaN
//       nanValues[key] = 'NaN';
//     }
//   });

//   // If any NaN values were found, return them in the response
//   if (Object.keys(nanValues).length > 0) {
//     return res.status(400).json({
//       error: "Invalid data: NaN values found",
//       nanValues: nanValues
//     });
//   }

//   const customMessage = `Dear Raine & Horne,
//  ,\n\n We have received an inquiry from: \n\n Name: ${name} \n\n Phone Number: ${phoneNumber} \n\n Email: ${email}  \n\n Address :  ${propertyname} \n\n Thank you `;

//   const mailOptions = {
//     from: 'millionaresthought01@gmail.com',
//     to: 'harpreet13108159@gmail.com',
//     subject: 'Inquiry for Free Apraisal',
//     text: customMessage
//   };

// console.log(mailOptions);
//   let sql = 'INSERT INTO newpropertymaildata SET ?';
//   console.log(sql);

//   connection.query(sql, data, async (err, results) => {
//     if (err) {
//       console.error('Database Error:', err);
//       return res.status(500).json({ error: err.message });
//     }
//     console.log("Data is inserted");

//     if (results.affectedRows > 0) {
//       try {
//         await transporter.sendMail(mailOptions);
//         console.log(`Email sent successfully`);
//         res.status(200).send('Email sent successfully');
//       } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Error sending email');
//       }
//     }
//   });
// });

app.post('/newdevform', async (req, res) => {
  try {
    const { name, email, phone, dialcode, propertyname } = req.body;
    console.log(req.body);

    // Check if dialcode and phone are received properly

    // Check if dialcode is a valid string
    if (typeof dialcode !== 'string') {
      return res.status(400).json({
        error: "Invalid data: dialcode is not a string"
      });
    }

    // Check if phone is a valid string
    if (typeof phone !== 'string') {
      return res.status(400).json({
        error: "Invalid data: phone is not a string"
      });
    }

    // Concatenate dialcode and phone to form phoneno
    const phoneno = `${dialcode}${phone}`;
    console.log("Phone Number with Dial Code:", phoneno);

    // Create data object for database insertion
    const data = {
      name: name,
      email: email,
      phoneno: phoneno,
      propertyname: propertyname
    };
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'millionairesthought01@gmail.com',
        pass: `utyc fgcz gsyp clql`
      }
    });
    const customMessage = `Dear Raine & Horne ,\n\n We have received an inquiry from: \n\n Name: ${name} \n\n Phone Number: ${phoneno} \n\n Email: ${email}  \n\n Property Name :${propertyname} \n\n Thank you `;

    const mailOptions = {
      from: 'millionaresthought01@gmail.com',
      to: 'harpreet13108159@gmail.com',
      subject: 'Inquiry for Free Apraisal',
      text: customMessage
    };

    console.log(mailOptions);
    let sql = 'INSERT INTO newpropertymaildata SET ?';
    console.log(sql);

    connection.query(sql, data, async (err, results) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Data is inserted");

      if (results.affectedRows > 0) {
        try {
          await transporter.sendMail(mailOptions);
          console.log(`Email sent successfully`);
          res.status(200).send('Email sent successfully');
        } catch (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
        }
      }
    });

    // Rest of your code...

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/datafetchone", async (req, res) => {
  //  BasicPropertiesDetails  // UnitDetails // PropertyArea
  const adtype = req.params.name;
  let sql = ` select *from BasicPropertiesDetails as bpd,UnitDetails ul , ListingAgent as la,PropertiesImages as pi , PropertyArea as pa 
   where bpd.count=1 and bpd.count=ul.count and bpd.count=pa.count and bpd.count=pi.count and bpd.count=la.count`;
  const result = await singleQuery(sql);
  if (result) {
    res.json(result);
  } else {
    console.log("no data");
  }
});

function singleQuery(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

app.post('/getemailforsub', (req, res) => {
  let data = {
    Email: req.body.subemail,

  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "harpreet13108159@gmail.com",
      pass: "sufy ntux xlfm uhhq"
    }
  });
  // Object to store any NaN value fields
  let nanValues = {};

  // Check each field for NaN values
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'number' && isNaN(value)) { // Check for NaN
      nanValues[key] = 'NaN';
    }
  });

  // If any NaN values were found, return them in the response
  if (Object.keys(nanValues).length > 0) {
    return res.status(400).json({
      error: "Invalid data: NaN values found",
      nanValues: nanValues
    });
  }

  const customMessage = `Dear Raine & Horne,
 ,\n\n We have received an inquiry from Home Page : \n\n Name: ${req.body.subemail}  \n\n Thank you `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'marketing@rhdubai.ae',
    subject: `Inquiry from ${req.body.about}`,
    text: customMessage
  };



  let sql = `insert into subscribeemails set ?`;
  connection.query(sql, data, async (err, results) => {
    if (err) {
      console.error('Database Error:', err);
      return res.status(500).json({ error: err.message });
    }


    if (results.affectedRows > 0) {
      try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      }
    }
  });

})



app.get('/testimonials', (req, res) => {
  let sql = "select* from testimonials";
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results)
  })
})


app.get("/homedata", (req, res) => {
  let sql = "select* from userinfo";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result)
  })
})
app.get("/otherformdata", (req, res) => {
  let sql = "select* from commondb";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result)
  })
})
app.get("/saledata", (req, res) => {
  let sql = "select* from saleform";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result)
  })
})




// **************************************End GrapesEditor************************************


// All other requests return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// All other requests return the React app
app.post('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




app.listen(port, () => {
  console.log(`This is port no ${port}`);
});

