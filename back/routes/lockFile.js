const express = require('express');
const router = express.Router();
const puppeteer = require("puppeteer");
const path = require('path');
const HummusRecipe = require('hummus-recipe');
const fs = require("fs");

router.post("/:id",async(req, res) => {
    console.log(req.params.id);
    console.log("In lock file");
    const todays_date = new Date();
    const pdflocation = path.join("/home/lokeshmalik/Downloads", 'files', todays_date.getTime() + '.pdf');

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`http://localhost:3000/adminView/${req.params.id}`, {
        waitUntil: "networkidle2"
      });
      await page.setViewport({ width: 1680, height: 1050 });
      const pdf = await page.pdf({
         path: pdflocation,
        format: "A4"
      })
      .then((response)=>{
          
            console.log("in then");
            const pdfDoc = new HummusRecipe(pdflocation);

            pdfDoc
                .encrypt({
                    userPassword: '123',
                    ownerPassword: '123',
                    userProtectionFlag: 4
                })
                .endPDF();
               
      });
      await browser.close();
      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', 'inline;filename=yolo.pdf')
      console.log("after setting header");
    //   var options = {
    //     root: pdflocation
    // };
    // var fileName = pdflocation.split("files/")[1];
    //   res.sendFile(fileName, options, function (err) {
    //     if (err) {
            
    //     } else {
    //         console.log('Sent:', fileName);
    //     }
    // });
      // res.status(200).json(pdflocation);  
      // res.setHeader('Content-Type', 'application/pdf')
      // res.setHeader('Content-Disposition', 'inline;filename=yolo.pdf')
      // res.sendFile(pdflocation);
      // var file = fs.createReadStream("/home/lokeshmalik/Desktop/JS/UserOCR/back/routes/files/1653031034155.pdf");
      // file.pipe(res);
      return res.status(201).json("Saved in Files in Downloads");



});

module.exports = router;
