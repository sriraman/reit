import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import { NextUIProvider, Table, Container, Card, Text, Badge, Link, Image } from '@nextui-org/react';
import ReactGA from 'react-ga';

export default function Home() {

  const [priceData, setPriceData] = useState([]);
  const [width, setWidth] = useState(0);
  const scrips = ['EMBASSY','MINDSPACE', 'BIRET', 'NXST', 'PGINVIT','INDIGRID', 'IRBINVIT'];
  const scripsNAV = {
    'EMBASSY': 394.88,
    'MINDSPACE': 371.9,
    'BIRET': 333.81,
    'NXST': 127.7,
    'PGINVIT': 86.04,
    'INDIGRID': 131.62,
    'IRBINVIT': 100.39
  }

  const scripName = {
    'EMBASSY': "Embassy REIT",
    'MINDSPACE': "Mindspace REIT",
    'BIRET': "Brookfield REIT",
    'NXST': "Nexus Select REIT",
    'PGINVIT': "PowerGrid InvIT",
    'INDIGRID': "IndiGrid InvIT",
    'IRBINVIT': "IRB InvIT",
  }

  const sources = {
    'EMBASSY': 'https://eopwebsvr.blob.core.windows.net/media/filer_public/04/af/04af544a-5ca5-483b-a5d2-3dbc4764859c/embassy_ar_2023_c2c_v23_16062023_50mb_web.pdf',
    'MINDSPACE': 'https://scdelivery.kfintech.com/c/?u=iuuqt%3B00dsjnh%2Flgjoufdi%2Fdpn0cnbjmt0Gjmft027196%60NTC%60SFJU%60Boovbm.Sfqpsu.GZ34%60O%2Fqeg&p=qqttqbdb.pddkeRkR--234736508-45CEB252-938B-401A-AE70-FC40606BA1A5.8.1&e=s1',
    'BIRET': 'https://www.brookfieldindiareit.in/files/annual-report/Annual-Report-FY-22.pdf',
    'NXST': 'https://www.livemint.com/market/ipo/nexus-select-trust-ipo-strengths-and-risks-to-consider-before-investing-11683648737360.html',
    'PGINVIT': 'https://pginvit.in/uploads/4b4deaad-9c2f-4cbd-8557-2c1c0619c27f/02_PGInvIT_AR23_with_Annexures_and_Notice.pdf',
    'INDIGRID': 'https://s3-ap-southeast-1.amazonaws.com/reports.tickertape.in/CompanyUpdates/dCuZzJRn_kTKyotzME2l_hjMS-huWyAfUVkfiEjdmZg.pdf?AWSAccessKeyId=ASIA2W5NWF6VM4ZSV446&Expires=1689177812&Signature=N8vhS7NUqhnOsJJIzTMrP%2F3rYOw%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEFwaCmFwLXNvdXRoLTEiRzBFAiB1S1SOeV1iJece5BYAThuuujH%2BnC0OMN4kNh0GC5isRgIhAL6mlC1wITwhEuhnrElsFU%2FPqi2%2Fy5%2FwhXMzoU4ysLOvKr0FCNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQBRoMNzM2NDE0MjgxNjQyIgwCH4z%2FA0wDUyRqlr0qkQVZu%2F6jGR6K%2B6QuopfeVky1Th5trFROffDdweESHAO6l9Bb98Q8aSeqNZ0ZYFmTvVLLM6toDY5jg4cmbRbUNF1PvreR497O927mXDOI6HzAiiXRqh2sX7dBkAjY76AbsN8HceB%2B0Bdd5V6bu1CrFloq1gMeDRLeXa2tR%2BLrJJxosM7XlGqGEDR5UQbA7VoY52MaUOIsKcN17a99TpadBv6qgRHRMvgdThPaSU2ijf5rV%2B3w%2BJ9G4%2BLJ5GhQsTVaV8y5MsX6p0LC4jRmfiuRUkB6f1RvQeCjS%2BVyMPXoV7NLCLs4zn86ljXHiJWaZHfV2EkmZKLXP3%2FGb3HeRL%2FdVSuDYMZM51Llwwa8wjEIKgWzqBTrOCr4BI0PugnL88WsBhPyHKIzZYdg7vXOhE1Y9mmIqR9ds%2BhaTEv1ih%2FVe8Yy6UoLzvxf1q056m91FPjnoSSvTrUO8wrE9WxG41NAeV3YpjvLwbestzZ7tlkz5tickzadw2RlfTVWxldJnRo9F0PXdeHFpM2gH7zwaG%2FzdsHGafEUunoN1iRxDZAK6KISS3P2kzEorxbE9EqvK2opCz8SGx950XE374faywXXRbJv%2FGZWraQhOrd1Cr9ZCTe4ghj%2BrGuFdqmH%2B2wFvfPs337nLkI6bSvjqZC9rGxG3IQKEchtF0WBsbHZ0U31DMbHU9sj0MtnbcYJOpAGJBnLktyi42dtgeyRsk7wBB%2FAdtoN6J0yw844JnOYJSyaheZx2Lt96t5aJMT5TslUoCJIil%2BpSHHQgqyBo1fxNumgEf7w2UJB8QluBDQoNYwg69VOcRZzg4HGAMUxwQNnZNtU2EmWElwvzWBevM1k004yxH1Bs68bSET2%2BbQ%2B%2Fv8xv99Fm4Yw6p26pQY6sQGnoDQfun2LF2VNRlt9KhNYujOS0oIhcNVpk3FgicBbxs2tN05bczvmUGs2yCU007fVPPBaD0GN93sb%2BVmvGpxLNdiVTFifrS8Nzyej8IYuAKjUYizzXY8vtce8eHAgmoxdjK5g7MZ%2BcLoHQ8sCAk87uh1zYVhWfo00PKTtPCT45vi65sLkWue497JV0sFY8Ya1tCx4g7rQW%2Fsh%2BaG3R7tuoWwwc%2Fg4%2Fj8mEnSyvgrq4rs%3D',
    'IRBINVIT': 'https://www.irbinvit.co.in/Annual_Report%E2%80%932022-23.pdf',
  }


  React.useEffect(() => {
    setWidth(window.innerWidth);

    fetch('https://api.stockmarketapi.in/api/v1/getprices?token=cb4750604bb2a7697c40d1546ef4b02246ba9f2a6976570b0353203ec4474217&nsecode='+scrips.join(","))
      .then((response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      }))
      .then(data => {
        const priceData = data.data;
        setPriceData(priceData);
      })


    ReactGA.initialize('G-HQLFK7BPX1');
  }, []);

  return (
    <NextUIProvider>
      <Container css={{ backgroundColor: '#1d2027', minWidth: '100vw' }} fluid>
        <Head>
          <title>REITs </title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=450, initial-scale=1.0" />
        </Head>

        <Text
          size={(width > 500) ? 60 : 30}
          css={{
            textGradient: "45deg, $blue600 40%, $pink600 60%",
            textAlign: 'center',
            padding: (width > 500) ? '80px' : '30px'
          }}
          weight="bold"
        >
          REITs and InvITs
         <br/>
          price comparison with NAVs
        </Text>

        <Card variant="flat" css={{ maxWidth: '1200px', margin: 'auto' }}>
          
          <Table
            aria-label="Example table with static content"
            css={{
              height: "auto",
            }}
          >
            <Table.Header>
              <Table.Column>Name</Table.Column>
              <Table.Column>Current Price</Table.Column>
              <Table.Column>NAV</Table.Column>
              <Table.Column>Difference</Table.Column>
              <Table.Column>Source</Table.Column>
            </Table.Header>
            <Table.Body>
              {scrips.map((scrip,id) => {
                  const difference = Math.round(((priceData[scrip]?.ltp/scripsNAV[scrip]*100) - 100) * 100) / 100;
                  return (
                    <Table.Row key={id}>
                      <Table.Cell><Text weight="bold">{scripName[scrip]}</Text></Table.Cell>
                      <Table.Cell>{priceData[scrip]?.ltp}</Table.Cell>
                      <Table.Cell>{scripsNAV[scrip]}</Table.Cell>
                      <Table.Cell><Badge color={(difference > 0) ? "error" : "success"} variant="bordered">{difference}%</Badge></Table.Cell>
                      <Table.Cell>
                        {sources[scrip] && (
                          <Link href={sources[scrip]} target="_blank">
                            <Badge size="sm">Link</Badge>
                          </Link>
                        )}
                      </Table.Cell>
                      
                    </Table.Row>
                  );
                })
              }
            </Table.Body>
          </Table>
        </Card>

        <Container css={{ maxWidth: '1200px', margin: 'auto' }}>
          <Text size="$md" color='#888'>
            * NAV is based on the Annual Report FY23
          </Text>


          <Text
            h3
            css={{
              textGradient: "45deg, $blue600 -40%, $pink600 20%",
              paddingTop: '80px',
              paddingBottom: '10px'
            }}
            weight="bold"
          >
            Notes
          </Text>


          <Text size="$md" color='#bbb'>
            - It is for Educational Purpose only, Not an Investment advice
            <br/>
            - If price is far lower than NAV, It doesn't mean that it is undervalued always.
            <br/>
            - There might be multiple reasons for it. Do your own research.
            <br/>
            - Before making any purchase, contact SEBI registered advisor and take call.
            <br/>
            - If you like to contribute or give feedback, Please feel free to contact me at <Link href="mailto:hi@sriraman.dev">hi@sriraman.dev</Link>
          </Text>

            <Image
              width={300}
              height={300}
              src="./madebysri2.png"
              css={{ filter: 'invert(93%) sepia(3%) saturate(427%) hue-rotate(161deg) brightness(84%) contrast(91%)', rotate: '330deg', padding: 60 }}
            />
          
        </Container>
      </Container>
    </NextUIProvider>
  )
}
