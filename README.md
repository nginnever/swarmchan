# permawall

<h1>About</h1>

<p>This post wall is an experiment in IPFS - the InterPlanetary File System and this is a WIP. Adding posts to this site will distribute the data p2p. In fact, this whole site is hosted on IPFS!  Remeber back in the 90's when sites would host a guestbook? Well now you can sign the IPFS guestbook. <a href="http://voxelot.us/ipfs/QmYc3K9akvoDbnZiV4VEzmzZh4w4KjEVGWhRzmACKLf1CT">Try it here!</a></p>



<h1>How This Works</h1>

<p>This site is built in Javascript with Angular MVC. All of the code here is either client side JS or browserified nodejs. In order to achieve some data mutability the site is using the node-ipfs-api with IPNS - InterPlanetary Name Space. This wall will resolve a hard coded IPNS id and return the hash of the object that is storing the data posted to the wall. When a post is made the add function is called followed by a publish to IPNS. The IPNS id combined with the fact that this site must be viewed through a public gateway (or local gateway if you have IPFS installed) are the only points of centralization. In the future we may have an IPFS/IPNS implementation that can connect browsers p2p so that gateways or IPFS installations would not be needed. </p>



<h1>CORS</h1>

<p>Due to cross origin resourse sharing security I am unable to allow other browsers to send requests for the gateways to add or publish posts. I am not sure what the fix or hack for this is but feel free to try it out and let me know!</p>



<h1>Caveats</h1>

<p>This site is experimental and I have no guarantee that it will work for you.  IPNS is still a work in progress. If CORS allows it this also may publish to your IPNS object if viewed through your gateway since this site calls ipfs.publish which currently doesn't take an id parameter (assumed to be your own id). </p>
