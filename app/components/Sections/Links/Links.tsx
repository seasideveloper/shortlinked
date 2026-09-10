'use client'

import styles from './links.module.css'
import { useState, useRef } from 'react';
import { shortenUrlAction } from '../../../actions/shorten'
import Image from 'next/image';

import link_icon from '../../../../public/link_icon.svg'
import copy from '../../../../public/copy.svg';
import copied from '../../../../public/copied.svg'


export default function Links() {

  const [longUrl, setLongUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [base64String, setBase64String] = useState<string>(''); 

    type StorageLinks = {
    original: string,
    short: string
  }[]

  const [linksList, setLinksList] = useState<StorageLinks>([]);
  const [id, setId] = useState(null);

  const ref = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!longUrl) return;

    setLoading(true);
    setError('');
    setShortUrl('');

    // Trigger the secure server-side SDK execution
    const response = await shortenUrlAction(longUrl);

    if (response.success && response.shortURL) {
      setShortUrl(response.shortURL);
      setOriginalUrl(longUrl);
      setLongUrl('')

    setLinksList([{
        original: longUrl,
        short: response.shortURL
    }, ...linksList])

    const imageSrc = `data:${response.mimeType};base64,${response.base64Data}`;
    
    setQrCode(imageSrc);
    setBase64String(response.base64Data);

    } else {
      setError(response.error || "An error occurred.");
    }
    setLoading(false);
  };

function handleCopy(index: any) {
    setId(index)
  }

   // ADD THE TRIGGER DOWNLOAD HELPER HERE
  const triggerDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAsPNG = () => {
    const img = new window.Image(); 
    img.src = qrCode;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1000; // Set high resolution for crisp QR codes
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Fill a solid white background (crucial for QR readers)
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      triggerDownload(canvas.toDataURL('image/png'), 'qrcode.png');
    };
  };

    const downloadAsSVG = () => {
    const imageSrc = `data:image/svg+xml;base64,${base64String}`;
    triggerDownload(imageSrc, 'qrcode.svg');
  };

  return (
    <>
    <section className={styles.links_section}>
        <p className={styles.try_now}>Try it now - no signup needed</p>
        <h2 className={styles.heading}>See ShortLinked in action</h2>
        <form onSubmit={handleSubmit} ref={ref} className={styles.form_container}>
            <input 
                type="url" 
                name='shorten_link' 
                className={styles.shorten_link}
                placeholder='Place your URL here...'
                required
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
            />
            <button type='submit' 
                disabled={loading} 
                className={styles.shorten_link_btn} 
            >
            {loading ? 'Shortening...' : 'Shorten Link'}
            </button>
        </form>
        <p>Want custom domains, team analytics, and branded QR codes? - START HERE</p>

         {shortUrl && (linksList.map((link, index) => {
    return  <div key={index} className={styles.shortened_link_container}>

          <div className={styles.short_links_container}>

        <div className={styles.link_section}>
            <p className={styles.original_url}>{link.original}</p>


            <div className={styles.your_short_link_container}>
                <Image src={link_icon} height={25} width={25} alt='link icon' className={styles.link_icon}/>
                <p style={{color: '#112E5B', fontWeight: '600'}}>YOUR SHORT LINK:</p>
            </div>
            <div className={styles.short_url_container}>
            <a href={shortUrl} className={styles.shortLink} target="_blank" rel="noopener noreferrer">
                {link.short}
            </a>
            {/* <button className={id === index ? `${styles.copy_btn_active} ` : `${styles.copy_btn}`}
                onClick={()=> {
                navigator.clipboard.writeText(link.short); 
                handleCopy(index); 
                }}>
                {id === index ? 'Copied!' : 'Copy'}</button> */}
            <button className={id === index ? `${styles.copy_btn_active_icon} ` : `${styles.copy_btn_icon}`}
                onClick={()=> {
                navigator.clipboard.writeText(link.short); 
                handleCopy(index); 
                }}>
                    <Image src={id === index ? copied : copy} width={30} height={30} alt='copy icon' title='copy'/>
            </button>

            {id === index && 
                <p className={styles.copied}>Copied ✓</p>}
            </div>
        </div>


          {qrCode && (
            <div className={styles.qr_container}>
         <Image src={qrCode} alt="Generated QR Code" width={100} 
          height={100} />
          <div className={styles.buttons_container}>
            <button onClick={downloadAsPNG} className={styles.copy_btn} title='download png'>PNG</button>
            <button onClick={downloadAsSVG} className={styles.copy_btn} title='download svg'>SVG</button>
          </div>
          </div>
          )}
        </div>
        </div>
})

      )}

      {error && (
        <p>{error}</p>
      )}
    </section>
    </>
  )
}