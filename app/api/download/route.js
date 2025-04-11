export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL tidak ditemukan' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch(`https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    if (data && data.nowm) {
      return new Response(JSON.stringify({ downloadUrl: data.nowm }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ error: 'Gagal mengambil link download' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Terjadi kesalahan saat fetch link' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
