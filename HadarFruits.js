function createHadarFruits() {
  // setup and clear
  const doc = DocumentApp.create("פירות הדר");
  const body = doc.getBody();
  body.clear();


  // set first date
  const date = new Date("June 30, 2024");


  // fetch image and hebrew dates
  const img = UrlFetchApp.fetch("https://i.ibb.co/WF8NVmk/priHadar.png").getBlob();


  const getYearHebcal1 = "https://www.hebcal.com/converter?cfg=json&start=2024-06-30&end=2024-12-27&g2h=1";
  const getYearHebcal2 = "https://www.hebcal.com/converter?cfg=json&start=2024-12-28&end=2025-06-26&g2h=1";
  const getYearHebcal3 = "https://www.hebcal.com/converter?cfg=json&start=2025-06-26&end=2025-07-03&g2h=1";
  // concatenate the three JSONs (there's a limit of 180 per request)
  const hebrewDatesData = Object.assign(Object.assign(JSON.parse(UrlFetchApp.fetch(getYearHebcal1).getContentText()).hdates,
                          JSON.parse(UrlFetchApp.fetch(getYearHebcal2).getContentText()).hdates),
                          JSON.parse(UrlFetchApp.fetch(getYearHebcal3).getContentText()).hdates);


  // add title for first page
  body.getChild(0).asParagraph().setAlignment(DocumentApp.HorizontalAlignment.CENTER).setText("פירות הדר מחזור ז’");
  body.editAsText().setFontFamily("Alef").setFontSize(11);


  // loop until 7/1/2025
  for(var i=0; i < 365; i++)
  {
    // next page (add page break & advance date)
    body.appendPageBreak();
    date.setDate(date.getDate() + 1);


    // add dates
    var hebDate = hebrewDatesData[Utilities.formatDate(date, "Asia/Jerusalem", "yyyy-MM-dd")]["hebrew"];
    var dates = body.appendTable([[hebDate, dateToDay(date), Utilities.formatDate(date, "Asia/Jerusalem", "dd.MM.yyyy")]]);
    dates.setBorderWidth(0);


    // align dates to right sides
    dates.getChild(0).asTableRow().getCell(0).getChild(0).asParagraph().setAlignment(DocumentApp.HorizontalAlignment.LEFT);
    dates.getChild(0).asTableRow().getCell(1).getChild(0).asParagraph().setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    dates.getChild(0).asTableRow().getCell(2).getChild(0).asParagraph().setAlignment(DocumentApp.HorizontalAlignment.RIGHT);


    // add name, title and body
    body.appendParagraph("שם בעל הפרי").setAlignment(DocumentApp.HorizontalAlignment.CENTER).editAsText().setFontSize(13);
    body.appendParagraph("כותרת של הפרי הדר\n").setAlignment(DocumentApp.HorizontalAlignment.CENTER).editAsText().setFontSize(15);
    body.appendParagraph("טקסט של פרי הדר\nטקסט\nטקסט").setAlignment(DocumentApp.HorizontalAlignment.CENTER).editAsText().setFontSize(11);
   
    // add footer- line, image and text for the day
    body.appendHorizontalRule();


    var footerTable = body.appendTable([["", ""]]);
    footerTable.setBorderWidth(0);


    footerTable.getCell(0, 0).insertImage(0, img).setHeight(100).setWidth(100);
    footerTable.getCell(0, 1).insertParagraph(0, "מה קרה היום??? אפשר גם שתי שורות!").setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
  }
}


// gets a number 0-6 and returns a hebrew day
function dateToDay(d)
{
  switch (d.getDay())
  {
    case 1:
      return "שני";
    case 2:
      return "שלישי";
    case 3:
      return "רביעי";
    case 4:
      return "חמישי";
    case 5:
      return "שישי";
    case 6:
      return "שבת";
    case 0:
      return "ראשון";
  }
}
