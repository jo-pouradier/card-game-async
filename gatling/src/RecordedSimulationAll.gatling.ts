import { simulation, scenario, pause, atOnceUsers, AllowList, DenyList, RawFileBody } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

  const httpProtocol = http
    .baseUrl("http://localhost:5173")
    .inferHtmlResources()
    .doNotTrackHeader("1")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36");
  
  const headers_0 = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "Cache-Control": "max-age=0",
    "If-None-Match": "W/\"2f0-nf9JKx2AkwR3D6IPUXHSlWEw4n4\"",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_1 = {
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_2 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"7952-B96qvqQCLFbBWBawapYL13sPGZk\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_3 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"45e-PMK5DySEhYwNaUb7ebuZvmKb6M4\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_4 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"46bc-6Tn5IZwHtpLVITC6wERYgp5tzPY\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_5 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"27a-50Oe5S7HDq59Hm15o909pGTGmf8\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_6 = {
    "Origin": "http://localhost:5173",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_9 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"fa3-8Jz68F47e9t591f1KEGcocnLWxM\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_10 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"220-Gon2uQ8LtfXalH/9KlIqtHUDxWs\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_17 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"1f62-XhoRRMQjxrzCRSS5dtxm2/zs0TE\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_18 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"2f1-kfCQ+hdTJkGEId+cCiUi/UEs0Ec\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_19 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"1032-+i7vyxpFyaeb92LKk15ZSSpyOso\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_20 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"cd-jIQcnuVqMsq5igmZoSbUHQeBtRU\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_21 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"28a-bKrntqsVBTiOgdPEiNqpwUoS2u8\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_22 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"6fa-QDCswO++ctr7JYhMOlS8A/EAyLE\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_23 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"2db-8pOyTOmzy2zMUA59rFnodT6jqq0\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_24 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"264e-nLjiq9li34Uy8vML4UHCkhcnj3k\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_25 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"be4-qDgAXOLBaY+rqgojpn7vD9IivMg\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_26 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"524-rPOo3SMIfPLN7LxXfmO/piCIcdQ\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_29 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"d8a-rWM5xoPC/3Sbo7HwlJl/sBcK1GI\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_30 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"ec7-4W6q8pMwkZjONtUl1MVByq4ub3I\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_31 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"a76-+YVNA0hPFIYbPRcljRpL6K9+WkY\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_32 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"18cd-+34WQH/I8EIHup3zPcNfHGDR+88\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_33 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"1127-vald9/yzpiCMgyOK8Eg+1c8kJmQ\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_36 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"b3e-bfaoOFpCJ64SqsAnKr7KTDt+aZ0\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_37 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"9e2-fkivuH1QnAsSWyoPx9oNQUCRshc\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_38 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"c2a-YnvVNdG5qMAnP2OQIQ5KSSfXJWQ\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_39 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"1573-E29UriHJQ6AAyIKz3RXGDTL5o4k\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_40 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"b86-4LaNxROtQbeeZxeGXcLNlLRICmI\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_41 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"78c-iwsMJvLbDZ2/D5ZncRiMXzKyYtg\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_42 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"2301-Pt/lnIjg3M3MSwQpINwa10NwOuU\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_43 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"3809-EjFIKnIpced//v+qYQ/1t1liQgE\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_44 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"c61-gKStmhrY7wlFsLGCgdnE3v+agGI\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_45 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"10e4-W+i3IJylVm7ryTJTs69zITg5bXA\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_46 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"ec-9xwUK0ZCtzyO9xwONRAsM08LV5c\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_47 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"34fd-IZaCDMeUw1hJKdLuOPaaPpbUrsQ\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_48 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"1950-T2WEfA3rj8f0H35Cz2qYl/X3aEE\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_54 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"12c3-7crZL2hdAwqgrlJeg5bo0zW1xcs\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_55 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"2207-NxRKI4aFtP43qFxEkLaKkg0bXaE\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_56 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"15fc-z9hSJZ+Jhs7Zky1zTvCiyPhaCxs\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_57 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"af9-Ew+130NOx/+uLbXBD6Ml7ai16I0\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_58 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"225e-lwEykUtY5/BAUUE9EPtdTjf4Mss\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_59 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"22ce-lYcXl74LGgbnrEwvRxAi6tVHf+Y\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_60 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"12d3-OFgG+73WARUj3bkLP5zWG/ni8ks\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_61 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"141-Hm4ZlNW0C519xjPnvomRd5rBixU\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_62 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"f91-mtNp8mNrrC6Lh0gOcCDRN4JuBdQ\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_63 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"de5-Oz+wxqqMzZimlKXyZS/nQDSdInY\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_64 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"138c-xL5b9Qz+D1ybMAFMVG9c1Fsb6+Q\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_65 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"25c6-41Zb4nZCSznlzj1IlNuZL+PEy+w\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_66 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"d31-ASdBfHZ1siNSy6Adkid+i82y5/g\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_67 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"116e-YLWzeTnoGug0L6ZkkBW+mO/FDig\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_68 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"ec7-gcMiSe88jHmnknnJcCj3pRDlAeg\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_69 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"c7e-lHPxP7o0fuqQ2E9nvq6ChI7pBWs\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_70 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"1846-6aVMAnEnxBr3hYpabnq8aUvnlVI\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_75 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-None-Match": "W/\"2f94-FfJZs76wIx9A5y8TFHla3/RInrY\"",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_82 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_83 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "Content-type": "text/plain;charset=UTF-8",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_85 = {
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "If-Modified-Since": "Tue, 24 Dec 2024 13:41:05 GMT",
    "If-None-Match": "W/\"1497-1735047665560\"",
    "Sec-Fetch-Dest": "image",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_86 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_87 = {
    "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, br, zstd",
    "accept-language": "fr,en;q=0.9",
    "priority": "i",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS",
    "sec-fetch-dest": "image",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site"
  };
  
  const headers_88 = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "fr,en;q=0.9",
    "Content-Type": "application/json",
    "Origin": "http://localhost:5173",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "sec-ch-ua": "Chromium\";v=\"131\", \"Not_A Brand\";v=\"24",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "macOS"
  };
  
  const headers_90 = {
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
  };
  
  const uri1 = "https://cdn.socket.io/4.7.2/socket.io.min.js";
  
  const uri2 = "localhost";
  
  const uri3 = "http://medias.3dvf.com/news/sitegrab/gits2045.jpg";
  
  const uri4 = "https://s1.npass.app/icons/localhost.png";

  const scn = scenario("RecordedSimulationAll")
    .exec(
      http("request_0")
        .get("/shop/buy")
        .headers(headers_0)
        .resources(
          http("request_1")
            .get(uri1)
            .headers(headers_1),
          http("request_2")
            .get("/@vite/client")
            .headers(headers_2),
          http("request_3")
            .get("/src/main.tsx")
            .headers(headers_3),
          http("request_4")
            .get("/@react-refresh")
            .headers(headers_4),
          http("request_5")
            .get("/node_modules/vite/dist/client/env.mjs")
            .headers(headers_5),
          http("request_6")
            .get("/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=f8f66dbb")
            .headers(headers_6),
          http("request_7")
            .get("/node_modules/.vite/deps/react-dom_client.js?v=b556ca31")
            .headers(headers_6),
          http("request_8")
            .get("/node_modules/.vite/deps/react-redux.js?v=5ec9f592")
            .headers(headers_6),
          http("request_9")
            .get("/src/App.tsx")
            .headers(headers_9),
          http("request_10")
            .get("/src/store.ts")
            .headers(headers_10),
          http("request_11")
            .get("/node_modules/.vite/deps/chunk-DC5AMYBS.js?v=69d8178c")
            .headers(headers_6),
          http("request_12")
            .get("/node_modules/.vite/deps/react.js?v=f8f66dbb")
            .headers(headers_6),
          http("request_13")
            .get("/node_modules/.vite/deps/react-router-dom.js?v=9eeb0b15")
            .headers(headers_6),
          http("request_14")
            .get("/node_modules/.vite/deps/chunk-RLJ2RCJQ.js?v=69d8178c")
            .headers(headers_6),
          http("request_15")
            .get("/node_modules/.vite/deps/chunk-KDCVS43I.js?v=69d8178c")
            .headers(headers_6),
          http("request_16")
            .get("/node_modules/.vite/deps/@reduxjs_toolkit.js?v=4e4fb534")
            .headers(headers_6),
          http("request_17")
            .get("/src/components/utils/Navbar.tsx")
            .headers(headers_17),
          http("request_18")
            .get("/src/slices/cardSlice.ts")
            .headers(headers_18),
          http("request_19")
            .get("/src/components/utils/Notification.tsx")
            .headers(headers_19),
          http("request_20")
            .get("/src/hooks.ts")
            .headers(headers_20),
          http("request_21")
            .get("/src/slices/chatSlice.ts")
            .headers(headers_21),
          http("request_22")
            .get("/src/slices/connectedUserSlice.ts")
            .headers(headers_22),
          http("request_23")
            .get("/src/slices/notificationSlice.ts")
            .headers(headers_23),
          http("request_24")
            .get("/src/router/AppRouter.tsx")
            .headers(headers_24),
          http("request_25")
            .get("/src/socket/socket.ts")
            .headers(headers_25),
          http("request_26")
            .get("/src/slices/userSlice.ts")
            .headers(headers_26),
          http("request_27")
            .get("/node_modules/.vite/deps/chunk-42GS2BL3.js?v=69d8178c")
            .headers(headers_6),
          http("request_28")
            .get("/node_modules/.vite/deps/chunk-IIUSGDYG.js?v=69d8178c")
            .headers(headers_6),
          http("request_29")
            .get("/src/components/login/LoginLogout.tsx")
            .headers(headers_29),
          http("request_30")
            .get("/src/pages/ShopPage.tsx")
            .headers(headers_30),
          http("request_31")
            .get("/src/pages/Display.tsx")
            .headers(headers_31),
          http("request_32")
            .get("/src/pages/FormDisplay.tsx")
            .headers(headers_32),
          http("request_33")
            .get("/src/pages/Login.tsx")
            .headers(headers_33),
          http("request_34")
            .get("/node_modules/.vite/deps/socket__io-client.js?v=e807e8cd")
            .headers(headers_6),
          http("request_35")
            .get("/node_modules/.vite/deps/@mui_material.js?v=52bd7ea4")
            .headers(headers_6),
          http("request_36")
            .get("/src/pages/UserRegister.tsx")
            .headers(headers_36),
          http("request_37")
            .get("/src/pages/Home.tsx")
            .headers(headers_37),
          http("request_38")
            .get("/src/router/LoginProtectedRoutes.tsx")
            .headers(headers_38),
          http("request_39")
            .get("/src/components/shop/index.tsx")
            .headers(headers_39),
          http("request_40")
            .get("/src/pages/ChatPage.tsx")
            .headers(headers_40),
          http("request_41")
            .get("/src/pages/WaitingPage.tsx")
            .headers(headers_41),
          http("request_42")
            .get("/src/components/game/CardSelection.tsx")
            .headers(headers_42),
          http("request_43")
            .get("/src/components/game/BoardGame.tsx")
            .headers(headers_43),
          http("request_44")
            .get("/src/api/user/index.ts")
            .headers(headers_44),
          http("request_45")
            .get("/src/components/user/User.tsx")
            .headers(headers_45),
          http("request_46")
            .get("/src/types/UserDisplayLabelEnums.ts")
            .headers(headers_46),
          http("request_47")
            .get("/src/components/user/UserForm.tsx")
            .headers(headers_47),
          http("request_48")
            .get("/src/components/login/LoginForm.tsx")
            .headers(headers_48),
          http("request_49")
            .get("/node_modules/.vite/deps/@mui_icons-material.js?v=80d69983")
            .headers(headers_6),
          http("request_50")
            .get("/node_modules/.vite/deps/chunk-S725DACQ.js?v=69d8178c")
            .headers(headers_6),
          http("request_51")
            .get("/node_modules/.vite/deps/chunk-BGKFYLQZ.js?v=69d8178c")
            .headers(headers_6),
          http("request_52")
            .get("/node_modules/.vite/deps/chunk-JOHHVZFO.js?v=69d8178c")
            .headers(headers_6),
          http("request_53")
            .get("/node_modules/.vite/deps/react-router.js?v=d7025356")
            .headers(headers_6),
          http("request_54")
            .get("/src/components/shop/Shop.tsx")
            .headers(headers_54),
          http("request_55")
            .get("/src/components/shop/ShopBuy.tsx")
            .headers(headers_55),
          http("request_56")
            .get("/src/components/shop/ShopCreate.tsx")
            .headers(headers_56),
          http("request_57")
            .get("/src/components/shop/ShopLayout.tsx")
            .headers(headers_57),
          http("request_58")
            .get("/src/components/shop/ShopSell.tsx")
            .headers(headers_58),
          http("request_59")
            .get("/src/components/chat/Chat.tsx")
            .headers(headers_59),
          http("request_60")
            .get("/src/components/chat/ConnectedUserList.tsx")
            .headers(headers_60),
          http("request_61")
            .get("/src/components/chat/sendMessage.ts")
            .headers(headers_61),
          http("request_62")
            .get("/src/components/waitingRoom/WaitingRoom.tsx")
            .headers(headers_62),
          http("request_63")
            .get("/src/components/card/CardSelectPlay.tsx")
            .headers(headers_63),
          http("request_64")
            .get("/src/components/card/CardShortDisplay.tsx")
            .headers(headers_64),
          http("request_65")
            .get("/src/components/card/CardSimpleDisplay.tsx")
            .headers(headers_65),
          http("request_66")
            .get("/src/components/user/UserShortDisplay.tsx")
            .headers(headers_66),
          http("request_67")
            .get("/src/components/user/UserSimpleDisplay.tsx")
            .headers(headers_67),
          http("request_68")
            .get("/src/components/utils/AppModal.tsx")
            .headers(headers_68),
          http("request_69")
            .get("/src/components/card/CardGrid.tsx")
            .headers(headers_69),
          http("request_70")
            .get("/src/components/card/CardForm.tsx")
            .headers(headers_70),
          http("request_71")
            .get("/node_modules/.vite/deps/@mui_icons-material_Favorite.js?v=96215165")
            .headers(headers_6),
          http("request_72")
            .get("/node_modules/.vite/deps/@mui_icons-material_Bolt.js?v=98abcc32")
            .headers(headers_6),
          http("request_73")
            .get("/node_modules/.vite/deps/@mui_icons-material_AttachMoney.js?v=d01246d3")
            .headers(headers_6),
          http("request_74")
            .get("/node_modules/.vite/deps/@mui_icons-material_Shield.js?v=37e0777a")
            .headers(headers_6),
          http("request_75")
            .get("/src/assets/AttackIcon.tsx")
            .headers(headers_75),
          http("request_76")
            .get("/node_modules/.vite/deps/@mui_x-data-grid.js?v=fda7b525")
            .headers(headers_6),
          http("request_77")
            .get("/node_modules/.vite/deps/chunk-C6WWHQR7.js?v=69d8178c")
            .headers(headers_6),
          http("request_78")
            .get("/node_modules/.vite/deps/chunk-GDJEYTFF.js?v=69d8178c")
            .headers(headers_6),
          http("request_79")
            .get("/node_modules/.vite/deps/chunk-2OP64LZZ.js?v=69d8178c")
            .headers(headers_6),
          http("request_80")
            .get("/node_modules/.vite/deps/chunk-AF2ISU7D.js?v=69d8178c")
            .headers(headers_6),
          http("request_81")
            .get("/node_modules/.vite/deps/chunk-JLEXJJOW.js?v=69d8178c")
            .headers(headers_6)
        ),
      pause(1),
      http("request_82")
        .get("http://" + uri2 + ":3000/socket.io/?EIO=4&transport=polling&t=jbb685ge")
        .headers(headers_82)
        .resources(
          http("request_83")
            .post("http://" + uri2 + ":3000/socket.io/?EIO=4&transport=polling&t=jbc7f34z&sid=7bHHTalO2fvpduItAAAE")
            .headers(headers_83)
            .body(RawFileBody("recordedsimulationall/0083_request.html")),
          http("request_84")
            .get("http://" + uri2 + ":3000/socket.io/?EIO=4&transport=polling&t=jbc7hj93&sid=7bHHTalO2fvpduItAAAE")
            .headers(headers_82),
          http("request_85")
            .get("/vite.svg")
            .headers(headers_85),
          http("request_86")
            .get("/api/users")
            .headers(headers_86)
        ),
      pause(3),
      http("request_87")
        .get(uri4)
        .headers(headers_87)
        .check(status().is(404)),
      pause(8),
      http("request_88")
        .post("/api/user")
        .headers(headers_88)
        .body(RawFileBody("recordedsimulationall/0088_request.json")),
      pause(8),
      http("request_89")
        .get("/api/cards")
        .headers(headers_86),
      pause(1),
      http("request_90")
        .get(uri3)
        .headers(headers_90)
        .resources(
          http("request_91")
            .get("/api/cards")
            .headers(headers_86)
        ),
      pause(1),
      http("request_92")
        .post("/api/store/sell")
        .headers(headers_88)
        .body(RawFileBody("recordedsimulationall/0092_request.json"))
        .resources(
          http("request_93")
            .get("/api/cards")
            .headers(headers_86)
        ),
      pause(6),
      http("request_94")
        .get("/api/store/cards_to_sell")
        .headers(headers_86)
        .resources(
          http("request_95")
            .get("/api/store/cards_to_sell")
            .headers(headers_86),
          http("request_96")
            .post("/api/store/buy")
            .headers(headers_88)
            .body(RawFileBody("recordedsimulationall/0096_request.json")),
          http("request_97")
            .get("/api/store/cards_to_sell")
            .headers(headers_86)
        )
    );

export default simulation((setUp) => {
  setUp(scn.injectOpen(atOnceUsers(1))).protocols(httpProtocol);
});
