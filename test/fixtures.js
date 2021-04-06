export const officeDocParam = {
  data: {
    type: 'io.cozy.office.url',
    id: '32e07d806f9b0139c541543d7eb8149c',
    attributes: {
      document_id: '32e07d806f9b0139c541543d7eb8149c',
      subdomain: 'flat',
      protocol: 'https',
      instance: 'bob.cozy.example',
      public_name: 'Bob',
      onlyoffice: {
        url: 'https://documentserver/',
        documentType: 'word',
        document: {
          filetype: 'docx',
          key:
            '32e07d806f9b0139c541543d7eb8149c-56a653128a91a5c2291db9735b43fd86',
          title: 'Letter.docx',
          url:
            'https://bob.cozy.example/files/downloads/735e6cf69af2db82/Letter.docx?Dl=1',
          info: {
            owner: 'Bob',
            uploaded: '2010-07-07 3:46 PM'
          }
        },
        editor: {
          callbackUrl:
            'https://bob.cozy.example/office/32e07d806f9b0139c541543d7eb8149c/callback',
          lang: 'en',
          mode: 'edit'
        }
      }
    }
  }
}
