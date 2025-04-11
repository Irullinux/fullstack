'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    setLoading(true);
    setError('');
    setDownloadUrl('');

    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (res.ok) {
        setDownloadUrl(data.downloadUrl);
      } else {
        setError(data.error || 'Gagal mengunduh');
      }
    } catch (e) {
      setError('Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>TikTok Downloader</h1>
      <input
        type="text"
        placeholder="Masukkan URL TikTok"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <button onClick={handleDownload} disabled={loading} style={{ padding: 10 }}>
        {loading ? 'Memproses...' : 'Download'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {downloadUrl && (
        <p>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            Klik di sini untuk download video
          </a>
        </p>
      )}
    </main>
  );
}
