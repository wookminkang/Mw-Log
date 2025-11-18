const fs = require("fs")
const path = require("path")
const { GoogleSpreadsheet } = require("google-spreadsheet")
const { JWT } = require("google-auth-library")

const SPREADSHEET_ID = "1jEx8FOIcL-FxH2rxmXxukEVPtflzeueIB5In8sWKR3Y"
const LANGS = ["ko", "en", "ja", "zh"]

async function syncTranslations() {
  try {
    const creds = JSON.parse(
      fs.readFileSync(path.join(__dirname, "google.json"), "utf8")
    )

    const auth = new JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    })

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth)
    await doc.loadInfo()

    const sheet = doc.sheetsByIndex[0]
    const rows = await sheet.getRows()

    // index 기반으로 직접 매핑
    const result = { ko: {}, en: {}, ja: {}, zh: {} }

    rows.forEach((row) => {
      const raw = row._rawData

      const key = raw[0]
      if (!key) return

      result["ko"][key] = raw[1] || ""
      result["en"][key] = raw[2] || ""
      result["ja"][key] = raw[3] || ""
      result["zh"][key] = raw[4] || ""
    })

    LANGS.forEach((lang) => {
      const filePath = path.join(process.cwd(), "locales", `${lang}.json`)
      fs.writeFileSync(filePath, JSON.stringify(result[lang], null, 2))
      console.log(`${lang}.json 생성 완료`)
    })

    console.log("Google Sheet → JSON 변환 완료")
  } catch (err) {
    console.error("에러 발생:", err)
  }
}

syncTranslations()
