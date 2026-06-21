"use client";

import { useState, useMemo } from "react";
import { Heart, Briefcase, TrendingUp, Sparkles } from "lucide-react";

const IMG = (id: number) =>
  `https://www.sacred-texts.com/tarot/pkt/img/ar${String(id).padStart(2, "0")}.jpg`;

const TAROT = [
  { id: 0, name: "The Fool", nameTh: "คนโง่เขลา", keywords: ["เริ่มต้นใหม่", "อิสระ", "การผจญภัย"], upright: "จุดเริ่มต้นใหม่กำลังมาถึง คุณกำลังจะก้าวออกจากพื้นที่คุ้นเคยสู่เส้นทางใหม่ที่เต็มไปด้วยความเป็นไปได้ อย่ากลัวความไม่แน่นอน — จงเชื่อในตัวเองและก้าวไปข้างหน้าด้วยหัวใจที่เปิดกว้าง", reversed: "ระวังการตัดสินใจที่ประมาทเกินไป คุณอาจกำลังหนีปัญหาแทนที่จะเผชิญหน้า ลองหยุดคิดให้รอบคอบก่อนลงมือทำสิ่งใด" },
  { id: 1, name: "The Magician", nameTh: "นักมายากล", keywords: ["พลัง", "ความสามารถ", "ความตั้งใจ"], upright: "คุณมีทักษะและทรัพยากรทุกอย่างที่จำเป็นแล้ว ถึงเวลาที่จะนำศักยภาพที่มีอยู่มาใช้ให้เต็มที่ ความสำเร็จอยู่ในมือคุณ เพียงแค่ลงมือทำ", reversed: "พลังงานของคุณกำลังถูกใช้ผิดทาง หรืออาจมีคนรอบข้างที่ไม่ซื่อสัตย์ ระวังการหลอกลวงทั้งจากตัวเองและผู้อื่น" },
  { id: 2, name: "The High Priestess", nameTh: "นักบวชหญิง", keywords: ["สัญชาตญาณ", "ความลับ", "ปัญญา"], upright: "เชื่อสัญชาตญาณของคุณเถิด มีบางอย่างที่ซ่อนอยู่ใต้พื้นผิวรอให้คุณค้นพบ หยุดฟังเสียงภายในและอย่าเร่งรีบตัดสินใจใดๆ ในตอนนี้", reversed: "คุณกำลังเพิกเฉยต่อเสียงภายในของตัวเอง หรืออาจมีความลับที่ถูกปิดบัง อย่าไว้วางใจทุกอย่างที่เห็นบนผิวเผิน" },
  { id: 3, name: "The Empress", nameTh: "จักรพรรดินี", keywords: ["ความอุดมสมบูรณ์", "ธรรมชาติ", "ความรัก"], upright: "ช่วงเวลาแห่งความอุดมสมบูรณ์กำลังมาถึง ทั้งในด้านความรัก การงาน และชีวิตส่วนตัว จงดูแลตัวเองและสิ่งที่คุณรักด้วยความเอาใจใส่ ผลลัพธ์ที่ดีกำลังออกดอกผล", reversed: "คุณอาจกำลังละเลยตัวเองหรือความสัมพันธ์ที่สำคัญ ระวังความพึ่งพาผู้อื่นมากเกินไป หรืออาจมีปัญหาด้านความมั่นใจในตัวเอง" },
  { id: 4, name: "The Emperor", nameTh: "จักรพรรดิ", keywords: ["อำนาจ", "โครงสร้าง", "ความมั่นคง"], upright: "ถึงเวลาที่จะแสดงความเป็นผู้นำและรับผิดชอบในสิ่งที่คุณดูแล วางกฎเกณฑ์และโครงสร้างที่ชัดเจน ความมั่นคงและระเบียบจะนำความสำเร็จมาให้", reversed: "มีการใช้อำนาจในทางที่ผิดหรือขาดระเบียบวินัย อาจมีความขัดแย้งกับผู้มีอำนาจ ลองตรวจสอบว่าคุณกำลังควบคุมผู้อื่นมากเกินไปหรือเปล่า" },
  { id: 5, name: "The Hierophant", nameTh: "นักบวชผู้ยิ่งใหญ่", keywords: ["ประเพณี", "ความเชื่อ", "การนำทาง"], upright: "แสวงหาคำแนะนำจากผู้มีประสบการณ์หรือที่พึ่งทางจิตใจ การยึดมั่นในหลักการและประเพณีที่ดีจะช่วยนำทางคุณได้ในช่วงนี้", reversed: "คุณอาจกำลังตั้งคำถามกับความเชื่อเดิมๆ ซึ่งไม่ใช่เรื่องผิด แต่ระวังการปฏิเสธคำแนะนำที่ดีทิ้งไปทั้งหมด" },
  { id: 6, name: "The Lovers", nameTh: "คู่รัก", keywords: ["ความรัก", "ทางเลือก", "ความสัมพันธ์"], upright: "มีการตัดสินใจสำคัญเกี่ยวกับความสัมพันธ์หรือค่านิยมรออยู่ข้างหน้า จงเลือกจากหัวใจที่แท้จริงของคุณ ความรักและความสัมพันธ์กำลังเฟื่องฟู", reversed: "ความสัมพันธ์อาจมีปัญหาหรือมีความขัดแย้งในใจเกี่ยวกับการเลือก อย่าตัดสินใจจากความกลัวหรือแรงกดดันจากภายนอก" },
  { id: 7, name: "The Chariot", nameTh: "รถรบ", keywords: ["ชัยชนะ", "ความมุ่งมั่น", "การเดินทาง"], upright: "ด้วยความมุ่งมั่นและการควบคุมตนเอง คุณจะผ่านพ้นอุปสรรคทั้งหมดได้ ชัยชนะกำลังรอคุณอยู่ อย่าหยุดกลางทาง", reversed: "คุณอาจขาดทิศทางหรือพยายามบังคับสิ่งต่างๆ มากเกินไป ลองปล่อยให้สิ่งต่างๆ ไหลไปตามธรรมชาติบ้าง" },
  { id: 8, name: "Strength", nameTh: "พละกำลัง", keywords: ["ความกล้า", "ความอดทน", "จิตใจ"], upright: "ความแข็งแกร่งที่แท้จริงมาจากภายใน คุณมีพลังใจที่จะเผชิญกับทุกความท้าทาย จงใช้ความเมตตาและความนิ่งสงบในการรับมือกับสถานการณ์ยากๆ", reversed: "คุณอาจกำลังสงสัยในตัวเองหรือขาดความมั่นใจ ระวังการปล่อยให้อารมณ์ควบคุมการกระทำ ลองหาจุดสมดุลระหว่างหัวใจและเหตุผล" },
  { id: 9, name: "The Hermit", nameTh: "ผู้สันโดษ", keywords: ["การใคร่ครวญ", "ความสงบ", "ปัญญาภายใน"], upright: "ถึงเวลาที่จะถอยออกมาและใคร่ครวญชีวิตอย่างเงียบๆ คำตอบที่คุณต้องการอยู่ในใจคุณเอง ไม่ใช่จากคนอื่น ให้เวลากับตัวเองสักระยะ", reversed: "การแยกตัวออกมากเกินไปอาจทำให้คุณโดดเดี่ยว ลองเปิดใจรับความช่วยเหลือจากคนรอบข้างบ้าง" },
  { id: 10, name: "Wheel of Fortune", nameTh: "วงล้อแห่งโชคชะตา", keywords: ["โชคชะตา", "การเปลี่ยนแปลง", "วงจร"], upright: "ดวงชะตากำลังหมุน และโชคดีกำลังมาหาคุณ การเปลี่ยนแปลงครั้งสำคัญกำลังจะเกิดขึ้น จงพร้อมรับโอกาสที่จะเข้ามา", reversed: "ช่วงนี้โชคอาจไม่เข้าข้างคุณ แต่ทุกอย่างล้วนเป็นวงจร ความยากลำบากจะผ่านพ้นไป อดทนและปรับตัวให้เข้ากับการเปลี่ยนแปลง" },
  { id: 11, name: "Justice", nameTh: "ความยุติธรรม", keywords: ["ความยุติธรรม", "ความจริง", "ผลแห่งกรรม"], upright: "ผลลัพธ์ที่ยุติธรรมกำลังจะเกิดขึ้น สิ่งที่คุณหว่านไว้จะกลับมาสู่คุณ หากคุณทำสิ่งที่ถูกต้อง ไม่ต้องกังวล ความจริงจะปรากฏ", reversed: "อาจมีความอยุติธรรมหรือความลำเอียงเกิดขึ้น ตรวจสอบว่าคุณกำลังยืนอยู่บนความจริงหรือเปล่า และระวังการตัดสินผู้อื่นโดยไม่มีข้อมูลครบถ้วน" },
  { id: 12, name: "The Hanged Man", nameTh: "ชายถูกแขวน", keywords: ["การรอคอย", "การยอมรับ", "มุมมองใหม่"], upright: "บางครั้งการหยุดรอและปล่อยวางคือทางออกที่ดีที่สุด ลองมองสถานการณ์จากมุมมองใหม่ที่แตกต่าง การเสียสละเล็กน้อยในตอนนี้จะนำมาซึ่งผลดีในอนาคต", reversed: "คุณอาจกำลังยื้อสิ่งที่ควรปล่อยให้ผ่านไป หรืออาจเสียสละตัวเองมากเกินไปโดยไม่จำเป็น ถึงเวลาลงมือทำแล้ว" },
  { id: 13, name: "Death", nameTh: "ความตาย", keywords: ["การเปลี่ยนแปลง", "การสิ้นสุด", "การเริ่มต้นใหม่"], upright: "ไม่ได้หมายถึงการตายจริงๆ แต่คือการสิ้นสุดของบทหนึ่งในชีวิต เพื่อเปิดทางให้กับสิ่งใหม่ที่ดีกว่า จงปล่อยวางสิ่งที่ไม่รับใช้คุณอีกต่อไป", reversed: "คุณกำลังต่อต้านการเปลี่ยนแปลงที่หลีกเลี่ยงไม่ได้ การยึดติดกับสิ่งเก่าจะทำให้คุณหยุดนิ่ง จงกล้าที่จะปล่อยวาง" },
  { id: 14, name: "Temperance", nameTh: "ความพอดี", keywords: ["ความสมดุล", "ความอดทน", "การผสมผสาน"], upright: "ความสมดุลและความพอดีคือกุญแจสำคัญในช่วงนี้ อย่าสุดโต่งไปด้านใดด้านหนึ่ง ความอดทนและการค่อยๆ ทำจะนำไปสู่ผลลัพธ์ที่ดีที่สุด", reversed: "ชีวิตกำลังขาดสมดุล คุณอาจทุ่มเทมากเกินไปในด้านใดด้านหนึ่ง ลองประเมินความสำคัญของแต่ละด้านในชีวิตใหม่อีกครั้ง" },
  { id: 15, name: "The Devil", nameTh: "ปีศาจ", keywords: ["การติดกับดัก", "วัตถุนิยม", "กิเลส"], upright: "มีบางอย่างที่กำลังยึดคุณไว้ อาจเป็นความสัมพันธ์ที่เป็นพิษ นิสัยไม่ดี หรือความกลัว คุณมีพลังที่จะตัดโซ่เหล่านั้นได้ แต่ต้องยอมรับความจริงก่อน", reversed: "คุณกำลังเริ่มตระหนักถึงสิ่งที่ยึดตรึงคุณไว้และพร้อมจะปลดปล่อยตัวเอง นี่คือก้าวแรกสู่อิสรภาพ" },
  { id: 16, name: "The Tower", nameTh: "หอคอย", keywords: ["การพังทลาย", "การเปลี่ยนแปลงฉับพลัน", "การตื่นรู้"], upright: "การเปลี่ยนแปลงที่ไม่คาดคิดและรุนแรงกำลังจะเกิดขึ้น แม้จะเจ็บปวด แต่สิ่งที่พังทลายล้วนเป็นสิ่งที่ไม่มั่นคงอยู่แล้ว หลังพายุผ่านไปจะมีรากฐานที่แข็งแกร่งกว่า", reversed: "คุณกำลังหลีกเลี่ยงการเปลี่ยนแปลงที่จำเป็น หรืออาจมีวิกฤตเล็กๆ ที่ส่งสัญญาณเตือนอยู่ ฟังและปรับตัวก่อนที่มันจะใหญ่โต" },
  { id: 17, name: "The Star", nameTh: "ดวงดาว", keywords: ["ความหวัง", "การรักษา", "แรงบันดาลใจ"], upright: "หลังผ่านช่วงเวลาที่ยากลำบาก ความหวังและการรักษากำลังมาถึง เชื่อในอนาคตที่สดใส คุณกำลังเดินอยู่บนเส้นทางที่ถูกต้อง", reversed: "ความหวังอาจดูเลือนลางในตอนนี้ แต่อย่ายอมแพ้ ลองหาแรงบันดาลใจใหม่และเชื่อว่าสิ่งดีๆ จะกลับมา" },
  { id: 18, name: "The Moon", nameTh: "ดวงจันทร์", keywords: ["ความลวง", "ความกลัว", "จิตใต้สำนึก"], upright: "ไม่ใช่ทุกอย่างที่เห็นคือความจริง ระวังความเข้าใจผิดและการหลอกตัวเอง จิตใต้สำนึกกำลังส่งสัญญาณบางอย่างให้คุณ ลองฟังความฝันและความรู้สึกลึกๆ", reversed: "ความกลัวและความสับสนกำลังเริ่มจางหาย ความจริงกำลังจะปรากฏขึ้น คุณเริ่มมองเห็นสถานการณ์ได้ชัดเจนขึ้น" },
  { id: 19, name: "The Sun", nameTh: "ดวงอาทิตย์", keywords: ["ความสุข", "ความสำเร็จ", "ความมีชีวิตชีวา"], upright: "ช่วงเวลาแห่งความสุขและความสำเร็จกำลังมาถึง! พลังงานบวกล้อมรอบคุณอยู่ ความพยายามของคุณกำลังจะออกดอกผล จงเฉลิมฉลองและแบ่งปันความสุขนี้", reversed: "ความสุขอาจถูกบดบังด้วยการมองโลกในแง่ร้าย ลองหาสิ่งดีๆ รอบตัวคุณและอนุญาตให้ตัวเองมีความสุขบ้าง" },
  { id: 20, name: "Judgement", nameTh: "การพิพากษา", keywords: ["การฟื้นคืน", "การตัดสิน", "การเรียกร้อง"], upright: "ถึงเวลาของการประเมินตัวเองและการตื่นรู้ครั้งสำคัญ บทเรียนในอดีตได้สอนคุณมามากพอแล้ว จงลุกขึ้นและเริ่มบทใหม่แห่งชีวิตด้วยความเข้าใจที่ลึกซึ้งขึ้น", reversed: "คุณอาจกำลังตัดสินตัวเองหรือผู้อื่นอย่างรุนแรงเกินไป หรือยังไม่ยอมรับบทเรียนจากอดีต ถึงเวลาให้อภัยตัวเองและก้าวต่อไป" },
  { id: 21, name: "The World", nameTh: "โลก", keywords: ["ความสมบูรณ์", "ความสำเร็จ", "การเดินทาง"], upright: "คุณกำลังจะถึงจุดสูงสุดของเส้นทางนี้! ความสำเร็จและความสมบูรณ์อยู่ตรงหน้า การเดินทางบทนี้ใกล้จบแล้ว และคุณจะออกไปพร้อมกับปัญญาและความสำเร็จ", reversed: "มีบางอย่างที่ยังค้างคาอยู่ ทบทวนดูว่ายังมีสิ่งที่ต้องทำให้สมบูรณ์ก่อนปิดบทนี้หรือเปล่า อย่ารีบสรุปว่าจบแล้ว" },
];

const TOPICS = [
  { id: "love", label: "ความรัก", emoji: <Heart size={28} />, color: "#ec4899", bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.3)", readings: ["ความสัมพันธ์ของคุณกำลังพัฒนาไปในทิศทางที่ดี จงเปิดใจรับความรักที่กำลังเข้ามา","ในด้านความรักตอนนี้ต้องการความอดทน อย่าเร่งรีบ ให้เวลาทำงาน","คนที่คุณรักต้องการพื้นที่ จงเคารพและรอคอยด้วยใจที่ดี","ความสัมพันธ์ใหม่กำลังจะเริ่มต้น เปิดใจรับสิ่งที่กำลังจะมา","มีบางอย่างที่ยังไม่พูดออกมาระหว่างคุณและคนสำคัญ ลองสื่อสารตรงๆ","ความรักต้องการการดูแลเอาใจใส่เหมือนต้นไม้ อย่าทอดทิ้งสิ่งที่มีค่า","ถึงเวลาทบทวนว่าความสัมพันธ์นี้ทำให้คุณเติบโตหรือหยุดนิ่ง","พลังงานแห่งความรักรอบตัวคุณแข็งแกร่งมาก จงเปล่งประกายออกไป","การให้อภัยเป็นกุญแจสำคัญในความสัมพันธ์ตอนนี้","ความรักที่แท้จริงเริ่มจากการรักตัวเองก่อน จงดูแลตัวเองด้วย","คนที่รักคุณอยู่ใกล้กว่าที่คิด ลองมองรอบๆ ตัวด้วยใจที่เปิดกว้าง","ความจริงใจและความซื่อสัตย์จะนำพาความรักที่มั่นคงมาให้","อดีตที่เจ็บปวดกำลังจะถูกปลดปล่อย เปิดทางให้กับความรักใหม่","ความสมดุลระหว่างการให้และการรับในความสัมพันธ์สำคัญมากตอนนี้","ระวังการยึดติดในความสัมพันธ์ที่ไม่ดีต่อใจ จงกล้าปล่อยวาง","การเปลี่ยนแปลงในความรักกำลังจะมาอย่างไม่คาดคิด จงรับมือด้วยใจสงบ","ความหวังในความรักยังคงมีอยู่ อย่าหมดศรัทธาในสิ่งที่ดีงาม","ความลับในความสัมพันธ์กำลังจะถูกเปิดเผย จงพร้อมรับความจริง","ความสุขในความรักกำลังจะมาถึง ช่วงเวลานี้คือจุดเริ่มต้นที่ดี","ถึงเวลาประเมินความสัมพันธ์ทั้งหมดในชีวิต เพื่อเลือกสิ่งที่ดีที่สุด","ความรักที่สมบูรณ์แบบกำลังรอคุณอยู่ที่ปลายทาง","ความรักและชีวิตครอบครัวกำลังเบ่งบาน ช่วงเวลานี้น่าเฉลิมฉลอง"] },
  { id: "career", label: "การงาน", emoji: <Briefcase size={28} />, color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.3)", readings: ["โอกาสใหม่ในการงานกำลังเปิดขึ้น จงเตรียมพร้อมและก้าวออกไปรับมัน","ในที่ทำงานตอนนี้ต้องการความรอบคอบ ทบทวนแผนงานก่อนลงมือ","ทักษะของคุณกำลังได้รับการยอมรับ ถึงเวลาแสดงฝีมือให้เต็มที่","การเปลี่ยนงานหรือเส้นทางใหม่กำลังใกล้เข้ามา จงฟังสัญชาตญาณ","ความขัดแย้งในที่ทำงานต้องการการสื่อสารที่ชัดเจนและตรงไปตรงมา","ผลงานที่คุณทุ่มเทมาจะได้รับการตอบแทนในเร็วๆ นี้","ถึงเวลาที่จะขอเพิ่มเงินเดือนหรือตำแหน่งที่สูงขึ้น คุณพร้อมแล้ว","ความคิดสร้างสรรค์ของคุณเป็นจุดแข็งที่ยิ่งใหญ่มากในตอนนี้","อดทนและมุ่งมั่นต่อไป ความสำเร็จในหน้าที่การงานไม่ไกลเกินเอื้อม","ถึงเวลาเรียนรู้ทักษะใหม่เพื่อเพิ่มคุณค่าให้ตัวเองในสายงาน","เพื่อนร่วมงานหรือหัวหน้าบางคนอาจไม่ซื่อสัตย์ ระวังและสังเกตให้ดี","ความยุติธรรมในที่ทำงานกำลังจะปรากฏ ผลงานจะพูดแทนคุณเอง","การสิ้นสุดของโปรเจกต์หรืองานเดิมจะเปิดทางให้กับโอกาสที่ดีกว่า","ความสมดุลระหว่างงานและชีวิตส่วนตัวเป็นเรื่องเร่งด่วนที่ต้องจัดการ","ระวังคนที่อาจขโมยความคิดหรือใช้ประโยชน์จากคุณในที่ทำงาน","การเปลี่ยนแปลงครั้งใหญ่ในองค์กรกำลังจะมา จงเตรียมปรับตัว","อนาคตการงานของคุณสดใสมาก ความหวังและความมุ่งมั่นจะนำทาง","มีสิ่งที่ซ่อนอยู่ในสถานการณ์การงานตอนนี้ ลองสังเกตให้ลึกขึ้น","ความสำเร็จและการยอมรับในอาชีพกำลังจะมาถึงในเร็วๆ นี้","ถึงเวลาประเมินเส้นทางอาชีพและตัดสินใจว่าจะก้าวต่อไปอย่างไร","จุดสูงสุดของเส้นทางอาชีพนี้กำลังจะมาถึง จงภาคภูมิใจในตัวเอง","ความสำเร็จในการงานและโปรเจกต์ใหม่กำลังเปิดประตูรอคุณอยู่"] },
  { id: "money", label: "การเงิน", emoji: <TrendingUp size={28} />, color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.3)", readings: ["โอกาสทางการเงินใหม่กำลังเปิดขึ้น จงมองหาด้วยสายตาที่เฉียบคม","ระวังการใช้จ่ายที่ไม่จำเป็น ทบทวนงบประมาณของคุณให้ดี","การลงทุนหรือการออมที่คุณเริ่มต้นไว้จะให้ผลตอบแทนที่ดี","รายได้เสริมหรือแหล่งเงินใหม่กำลังจะเข้ามาในชีวิตคุณ","ความขัดแย้งเรื่องเงินกับคนรอบข้างต้องการการพูดคุยอย่างตรงไปตรงมา","ความพยายามทางการเงินของคุณกำลังจะได้รับผลตอบแทนที่คุ้มค่า","ถึงเวลาเจรจาหรือขอสิ่งที่คุณสมควรได้รับในด้านการเงิน","ความคิดสร้างสรรค์อาจเปลี่ยนเป็นรายได้ได้ หากคุณลงมือทำ","ความมั่นคงทางการเงินกำลังค่อยๆ สร้างขึ้น อดทนต่อไป","ลงทุนในตัวเองและความรู้ใหม่ๆ จะให้ผลตอบแทนมหาศาลในอนาคต","ระวังคนที่อาจหวังผลประโยชน์ทางการเงินจากคุณโดยไม่ซื่อสัตย์","ผลลัพธ์ทางการเงินกำลังจะปรากฏตามที่ควรจะเป็น จงรอด้วยใจสงบ","การปิดบัญชีเก่าหรือจบหนี้สินกำลังจะทำให้คุณมีอิสระมากขึ้น","ความสมดุลระหว่างการออมและการใช้จ่ายเพื่อความสุขเป็นเรื่องสำคัญ","ระวังการติดกับดักทางการเงิน เช่น หนี้สินหรือการพนัน จงฉลาดเลือก","การเปลี่ยนแปลงทางการเงินครั้งใหญ่กำลังจะมา เตรียมแผนสำรองไว้","แสงสว่างทางการเงินกำลังจะปรากฏ ความยากลำบากใกล้สิ้นสุดแล้ว","สถานการณ์การเงินบางอย่างยังไม่ชัดเจน รอข้อมูลเพิ่มเติมก่อนตัดสินใจ","ความมั่งคั่งและความสำเร็จทางการเงินกำลังจะมาถึงในไม่ช้า","ถึงเวลาตัดสินใจครั้งสำคัญเรื่องการลงทุนหรือการวางแผนอนาคต","เส้นทางสู่ความมั่นคงทางการเงินกำลังสมบูรณ์แบบขึ้นเรื่อยๆ","ความอุดมสมบูรณ์ทางการเงินกำลังจะเข้ามาในทุกด้านของชีวิต"] },
];

const SPREADS = [
  { id: "one", label: "1 ใบ", desc: "คำถามเดียว", count: 1, positions: ["ตอนนี้"] },
  { id: "three", label: "3 ใบ", desc: "อดีต · ปัจจุบัน · อนาคต", count: 3, positions: ["อดีต", "ปัจจุบัน", "อนาคต"] },
  { id: "five", label: "5 ใบ", desc: "วิเคราะห์เชิงลึก", count: 5, positions: ["ตัวเอง", "อุปสรรค", "รากฐาน", "คำแนะนำ", "ผลลัพธ์"] },
];

type Phase = "pick-topic" | "pick-spread" | "pick-cards" | "result";
type DrawnCard = { card: (typeof TAROT)[0]; reversed: boolean; flipped: boolean };

export default function TarotPage() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [spread, setSpread] = useState(SPREADS[1]);
  const [phase, setPhase] = useState<Phase>("pick-topic");
  const [deckOrder, setDeckOrder] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [drawn, setDrawn] = useState<DrawnCard[]>([]);
  const [showIntention, setShowIntention] = useState(false);

  const deckMeta = useMemo(() => {
    return Array.from({ length: 22 }, () => ({
      rotate: (Math.random() - 0.5) * 40,
    }));
  }, [deckOrder]);

  function startPicking() {
    const shuffled = [...Array(22).keys()].sort(() => Math.random() - 0.5);
    setDeckOrder(shuffled);
    setSelected([]);
    setDrawn([]);
    setPhase("pick-cards");
    setShowIntention(true);
  }

  function pickCard(idx: number) {
    if (selected.includes(idx)) return;
    if (selected.length >= spread.count) return;
    const next = [...selected, idx];
    setSelected(next);
    if (next.length === spread.count) {
      const cards: DrawnCard[] = next.map((i) => ({
        card: TAROT[deckOrder[i]],
        reversed: Math.random() > 0.65,
        flipped: false,
      }));
      setDrawn(cards);
      setTimeout(() => {
        setPhase("result");
        cards.forEach((_, ci) => {
          setTimeout(() => {
            setDrawn((prev) => prev.map((c, pi) => pi === ci ? { ...c, flipped: true } : c));
          }, ci * 500 + 200);
        });
      }, 300);
    }
  }

  function reset() {
    setPhase("pick-topic");
    setSelected([]);
    setDrawn([]);
  }

  return (
    <>
      <main style={{ minHeight: "100vh", color: "var(--text)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "100px 20px 64px" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h1 style={{ fontSize: "clamp(28px,5vw,44px)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
              ✦ ดูดวงไพ่ยิปซี
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 8 }}>
              เลือกหัวข้อ · สับไพ่ · รับคำทำนาย
            </p>
          </div>

          {/* Progress steps */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
            {[
              { key: "pick-topic", label: "หัวข้อ" },
              { key: "pick-spread", label: "จำนวนไพ่" },
              { key: "pick-cards", label: "เลือกไพ่" },
              { key: "result", label: "ผลลัพธ์" },
            ].map((step, i) => {
              const phases = ["pick-topic", "pick-spread", "pick-cards", "result"];
              const current = phases.indexOf(phase);
              const stepIdx = phases.indexOf(step.key);
              const active = stepIdx === current;
              const done = stepIdx < current;
              return (
                <div key={step.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                    background: active ? topic.bg : done ? "var(--surface-2)" : "var(--surface)",
                    border: `1px solid ${active ? topic.border : "var(--border)"}`,
                    color: active ? topic.color : done ? "var(--text-muted)" : "var(--text-muted)",
                    transition: "all 0.2s",
                  }}>
                    <span>{done ? "✓" : i + 1}</span>
                    <span>{step.label}</span>
                  </div>
                  {i < 3 && <span style={{ color: "var(--border)", fontSize: 10 }}>›</span>}
                </div>
              );
            })}
          </div>

          {/* Step 1: Choose topic */}
          {phase === "pick-topic" && (
            <>
              <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 14, marginBottom: 20 }}>
                เลือกด้านที่ต้องการดูดวง
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
                {TOPICS.map((t) => (
                  <button key={t.id} onClick={() => setTopic(t)}
                    style={{
                      background: topic.id === t.id ? t.bg : "var(--surface)",
                      border: `2px solid ${topic.id === t.id ? t.color : "var(--border)"}`,
                      borderRadius: 16,
                      padding: "24px 16px",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow: topic.id === t.id ? `0 0 0 4px ${t.color}15` : "none",
                    }}>
                    <div style={{ marginBottom: 10, display: "flex", justifyContent: "center", color: topic.id === t.id ? t.color : "var(--text-muted)" }}>{t.emoji}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: topic.id === t.id ? t.color : "var(--text)" }}>{t.label}</div>
                  </button>
                ))}
              </div>
              <div style={{ textAlign: "center" }}>
                <button onClick={() => setPhase("pick-spread")}
                  style={{
                    background: topic.color,
                    border: "none",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    padding: "14px 40px",
                    cursor: "pointer",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  ถัดไป →
                </button>
              </div>
            </>
          )}

          {/* Step 2: Choose spread */}
          {phase === "pick-spread" && (
            <>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <span style={{ marginRight: 8, color: topic.color, display: "flex" }}>{topic.emoji}</span>
                <span style={{ fontWeight: 700, color: topic.color }}>{topic.label}</span>
              </div>
              <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 14, marginBottom: 20 }}>
                เลือกจำนวนไพ่
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
                {SPREADS.map((s) => (
                  <button key={s.id} onClick={() => setSpread(s)}
                    style={{
                      background: spread.id === s.id ? topic.bg : "var(--surface)",
                      border: `2px solid ${spread.id === s.id ? topic.color : "var(--border)"}`,
                      borderRadius: 16,
                      padding: "20px 12px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textAlign: "center",
                    }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: spread.id === s.id ? topic.color : "var(--text)", marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.desc}</div>
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button onClick={() => setPhase("pick-topic")}
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--text-muted)", fontSize: 14, fontWeight: 600, padding: "12px 24px", cursor: "pointer" }}>
                  ← ย้อนกลับ
                </button>
                <button onClick={startPicking}
                  style={{ background: topic.color, border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, padding: "12px 32px", cursor: "pointer" }}>
                  สับไพ่ →
                </button>
              </div>
            </>
          )}

          {/* Step 3: Pick cards */}
          {phase === "pick-cards" && (
            <>
              <div style={{ textAlign: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: topic.color }}>
                  เลือกไพ่ {selected.length}/{spread.count} ใบ
                </span>
              </div>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  รอ: {spread.positions.slice(selected.length).join(" · ")}
                </span>
              </div>

              {/* Fan deck */}
              <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: 260, marginBottom: 40 }}>
                <div style={{ position: "relative", width: 120, height: 200 }}>
                  {deckOrder.map((_, idx) => {
                    const isPicked = selected.includes(idx);
                    const fanAngle = ((idx - 10.5) / 21) * 55;
                    const fanRadius = 200;
                    const tx = Math.sin((fanAngle * Math.PI) / 180) * fanRadius;
                    const ty = -Math.cos((fanAngle * Math.PI) / 180) * fanRadius + fanRadius - 40;
                    return (
                      <button key={idx} onClick={() => pickCard(idx)}
                        disabled={isPicked || selected.length >= spread.count}
                        style={{
                          position: "absolute",
                          width: 70, height: 110,
                          left: "50%", top: "50%",
                          marginLeft: -35, marginTop: -55,
                          transform: `translate(${tx}px, ${ty}px) rotate(${fanAngle}deg)`,
                          transformOrigin: "center bottom",
                          cursor: isPicked ? "default" : "pointer",
                          zIndex: isPicked ? 0 : idx + 1,
                          opacity: isPicked ? 0.2 : 1,
                          border: "none",
                          background: "transparent",
                          padding: 0,
                          transition: "opacity 0.3s",
                        }}>
                        <div style={{
                          width: "100%", height: "100%",
                          borderRadius: 8,
                          background: "#1a1a2e",
                          border: `1px solid ${isPicked ? "var(--border)" : topic.border}`,
                          boxShadow: isPicked ? "none" : `0 4px 12px rgba(0,0,0,0.3), 0 0 8px ${topic.color}22`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s",
                        }}>
                          <img src="/logo white.png" alt="AbcdeGo" style={{ width: 56, height: 56, objectFit: "contain", opacity: isPicked ? 0.15 : 0.85 }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <button onClick={reset}
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, color: "var(--text-muted)", fontSize: 13, padding: "10px 20px", cursor: "pointer" }}>
                  ← ยกเลิก
                </button>
              </div>
            </>
          )}

          {/* Step 4: Result */}
          {phase === "result" && (
            <>
              {/* Cards row */}
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
                {drawn.map((item, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: "1 1 100px", maxWidth: 130 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>{spread.positions[i]}</p>

                    <div style={{ width: "100%", aspectRatio: "2/3", perspective: 800 }}>
                      <div style={{
                        width: "100%", height: "100%",
                        position: "relative",
                        transformStyle: "preserve-3d",
                        transition: "transform 0.6s ease",
                        transform: item.flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}>
                        <div style={{
                          position: "absolute", inset: 0, backfaceVisibility: "hidden",
                          borderRadius: 10, overflow: "hidden",
                          background: "#1a1a2e",
                          border: `1px solid ${topic.border}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <img src="/abcdego_logo_76.png" alt="AbcdeGo" style={{ width: 40, height: 40, objectFit: "contain", opacity: 0.5 }} />
                        </div>
                        <div style={{
                          position: "absolute", inset: 0, backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          borderRadius: 10, overflow: "hidden",
                          border: `2px solid ${topic.color}`,
                          boxShadow: `0 0 16px ${topic.color}33`,
                        }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={IMG(item.card.id)} alt={item.card.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover", transform: item.reversed ? "rotate(180deg)" : "none" }} />
                        </div>
                      </div>
                    </div>

                    {item.flipped && (
                      <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text)", margin: "0 0 4px" }}>{item.card.nameTh}</p>
                        {item.reversed && (
                          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", fontWeight: 600 }}>กลับหัว</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Interpretations */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
                {drawn.filter((d) => d.flipped).map((item, i) => (
                  <div key={i} style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderLeft: `3px solid ${topic.color}`,
                    borderRadius: 12,
                    padding: "20px",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={IMG(item.card.id)} alt={item.card.name}
                        style={{ width: 40, height: 60, objectFit: "cover", borderRadius: 6, border: `1px solid ${topic.color}44`, flexShrink: 0, transform: item.reversed ? "rotate(180deg)" : "none" }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                          <span style={{ fontSize: 11, color: "var(--text-muted)", background: "var(--surface-2)", padding: "2px 8px", borderRadius: 4 }}>{spread.positions[i]}</span>
                          <span style={{ fontSize: 14, fontWeight: 700 }}>{item.card.nameTh}</span>
                          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.card.name}</span>
                          {item.reversed && <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 600 }}>↓ กลับหัว</span>}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                          {item.card.keywords.join(" · ")}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: topic.color, marginBottom: 8, fontWeight: 600 }}>
                      <span style={{ display: "inline-flex", verticalAlign: "middle", marginRight: 4 }}>{topic.emoji}</span> {topic.label}: {topic.readings[item.card.id]}
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-muted)", margin: 0 }}>
                      {item.reversed ? item.card.reversed : item.card.upright}
                    </p>
                  </div>
                ))}
              </div>

              {drawn.every((d) => d.flipped) && (
                <div style={{ textAlign: "center" }}>
                  <button onClick={reset}
                    style={{ background: topic.color, border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, padding: "14px 40px", cursor: "pointer" }}>
                    <Sparkles size={16} style={{ display: "inline", marginRight: 6 }} />ดูดวงใหม่
                  </button>
                </div>
              )}
            </>
          )}

          <div style={{ textAlign: "center", marginTop: 56, fontSize: 11, color: "var(--text-muted)", opacity: 0.5 }}>
            เพื่อความบันเทิงและการสะท้อนความคิดเท่านั้น
          </div>
        </div>
      </main>

      {/* Intention / meditation popup before picking cards */}
      {showIntention && (
        <div
          onClick={() => setShowIntention(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(10,10,20,0.6)", backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-bounce-in"
            style={{
              maxWidth: 380, width: "100%", textAlign: "center",
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 20, padding: "36px 28px",
              boxShadow: "0 12px 48px rgba(0,0,0,0.4)",
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 12 }}>ตั้งจิตให้สงบ</h2>
            <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 24 }}>
              หลับตา หายใจเข้าลึกๆ ทำสมาธิสักครู่<br />
              แล้วอธิษฐานถึงสิ่งที่อยากรู้ในใจ<br />
              เมื่อพร้อมแล้ว จึงค่อยเลือกไพ่
            </p>
            <button
              onClick={() => setShowIntention(false)}
              style={{
                background: topic.color, border: "none", borderRadius: 12, color: "#fff",
                fontSize: 15, fontWeight: 700, padding: "12px 36px", cursor: "pointer",
              }}
            >
              พร้อมแล้ว
            </button>
          </div>
        </div>
      )}
    </>
  );
}
