/** @type {import('next').NextConfig} */
// set url prefix for the static resource, useful in deploying to the custom domain or cdn
let assetPrefix = ``
let basePath = ``

// const isGithubActions = process.env.GITHUB_ACTIONS || false
// if (isGithubActions) {
//   const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '') // remove the github owner
//   assetPrefix = `/${repo}/`
//   basePath = `/${repo}`
// }



const nextConfig = {
  assetPrefix,
  basePath,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-us-west-2.amazonaws.com'
      }
    ]
  }
}

module.exports = nextConfig
