/**
 * /api/textbook?s={S1|S2|S3|S4}
 *
 * Google Drive PDF를 서버 사이드에서 프록시하여 브라우저에게 직접 스트리밍합니다.
 * 브라우저 기본 PDF 뷰어는 #page=N 프래그먼트를 지원하므로
 * 링크 URL을 /api/textbook?s=S1#page=45 형태로 사용하면
 * 브라우저가 45페이지로 바로 이동합니다.
 */

import { NextRequest, NextResponse } from 'next/server';

const DRIVE_FILE_IDS: Record<string, string> = {
  S1: '1Aqh1wn7SNF2DS4dm3xDMbVFk0wmaS3qV',
  S2: '1Kd_wZIcOv3PBJDVYAoN1Tmnsiy8SBZHl',
  S3: '1RpT71BF6Tz5mONDXW1mIp3DTH7bKi5Sg',
  S4: '1IOOlxT_LEkb70Ar6voYez409y83Ouq0Z',
};

const BOOK_NAMES: Record<string, string> = {
  S1: '1권_공공조달론',
  S2: '2권_공공구매실무',
  S3: '3권_공공계약관리',
  S4: '4권_공공조달관리실무',
};

/** Google Drive에서 PDF 스트림 취득 (여러 URL 패턴 순서대로 시도) */
async function fetchDrivePDF(fileId: string): Promise<Response | null> {
  const candidates = [
    // 최신 Google Drive 다운로드 도메인 (confirm=t 로 대용량 바이러스 체크 우회)
    `https://drive.usercontent.google.com/download?id=${fileId}&export=download&authuser=0&confirm=t`,
    // 구형 URL 포맷
    `https://drive.google.com/uc?id=${fileId}&export=download&confirm=t`,
  ];

  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        redirect: 'follow',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      });

      const ct = res.headers.get('content-type') ?? '';

      // PDF 또는 바이너리 스트림을 직접 반환
      if (res.ok && (ct.includes('application/pdf') || ct.includes('octet-stream'))) {
        return res;
      }

      // HTML이 반환된 경우 → Google Drive 확인 페이지에서 실제 URL 추출
      if (ct.includes('text/html')) {
        const html = await res.text();

        // drive.usercontent.google.com 형태의 직접 다운로드 URL
        const patterns = [
          /href="(https:\/\/drive\.usercontent\.google\.com\/download[^"]+)"/,
          /href="(https:\/\/drive\.usercontent\.google\.com\/[^"]+)"/,
          /href="(\/uc\?export=download[^"]+)"/,
        ];

        for (const pattern of patterns) {
          const m = html.match(pattern);
          if (m) {
            const extractedUrl = m[1].startsWith('/')
              ? `https://drive.google.com${m[1].replace(/&amp;/g, '&')}`
              : m[1].replace(/&amp;/g, '&');

            const sub = await fetch(extractedUrl, {
              redirect: 'follow',
              headers: { 'User-Agent': 'Mozilla/5.0' },
            });
            const subCT = sub.headers.get('content-type') ?? '';
            if (
              sub.ok &&
              (subCT.includes('application/pdf') || subCT.includes('octet-stream'))
            ) {
              return sub;
            }
          }
        }
      }
    } catch {
      // 다음 URL 패턴 시도
      continue;
    }
  }

  return null;
}

export async function GET(req: NextRequest) {
  const subjectId = (req.nextUrl.searchParams.get('s') ?? 'S1').toUpperCase();
  const fileId = DRIVE_FILE_IDS[subjectId];

  if (!fileId) {
    return new NextResponse('Not found', { status: 404 });
  }

  const pdfRes = await fetchDrivePDF(fileId);

  if (!pdfRes || !pdfRes.body) {
    // 프록시 실패 시 Google Drive 뷰어로 리다이렉트 (fallback)
    return NextResponse.redirect(`https://drive.google.com/file/d/${fileId}/view`);
  }

  const filename = `${BOOK_NAMES[subjectId] ?? 'textbook'}.pdf`;

  return new NextResponse(pdfRes.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      // inline: 새 탭에서 PDF 뷰어로 열기 (attachment 이면 다운로드)
      'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`,
      // 24시간 브라우저 캐시 (PDF는 변경 빈도 낮음)
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
