import {
	jsPDF as JSPDF,
} from 'jspdf'
import {
	html2canvasScale,
} from './constants'
import { addFontMedium } from './fonts/Orbitron-Medium'

class PDFService {
	constructor() {
		addFontMedium()
	}

	public getCertificate(htmlElement: HTMLElement,): void {
		const doc = new JSPDF('p', 'pt', [380.17, 476.25,],)
		doc.setFont('Orbitron-Bold', 'normal',)

		doc.html(htmlElement, {
			callback(pdf,) {
				pdf.save('certificate.pdf',)
			},
			html2canvas: {
				scale: html2canvasScale,
			},
		},)
	}
}

export const pdfService = new PDFService()