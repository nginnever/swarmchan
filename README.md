#swarmchan
<h1>React Rebuild</h1>
Switching to IPFS now that v0.4.0-dev has kind of been released to handle data aggregation from multiple sources. This will hopefully work and soon you won't have to pay ether to post. Ether will remain as a tipping system. Each user will automagically have their ether address stamped on their posts so others can send ether for liked content. Also migrating the app framework over to react, angular is good but I have found react to work well for static single page applications that can be hosted on IPFS. Big thanks to the javascript guys at IPFS and the core devs for working hard on 0.4.0 release as well as to fazo for ipfs-boards. This redesign owes a lot to them. 

<h1>About</h1>
<p>This is a chan style message board. Unlike other sites, this application does not have a mod, an owner, or a server. This is an experiment in <a href="https://ipfs.io/">IPFS</a> - the InterPlanetary File System and the <a href="https://ipfs.io/">Ethereum</a> blockchain and a WIP. Adding posts will distribute the data p2p in an attempt to make something as simple as text (for now, images coming soon) persist. Currently what you post here has no way of being censored or removed. As long as a computer has the app files and ethereum can resolve the current data state and assuming someone has it... and well I can't promise this will work and you will need a local ipfs and ethereum go client node running to use this. Be warned that just viewing the posts in this application will download them to your hard drive. I would suggest running <code>ipfs repo gc</code> after viewing this site.<a href="#/boards">Try it here!</a></p>

<h1>How This Works</h1>
<p>This site is built in Javascript with Angular MVC. All of the code here is either client side JS or browserified nodejs. This application is distributed by the IPFS protocol and connects to the Ethereum api to provide consensus on the current state of the posts on any given wall.  The contents of this application are hashed and distributed with a DHT routing protocol. When a post is made you append your post data to a json object and add the new object to ipfs making it ready to be requested via the DHT by other users. A transaction to a smart contract is then bundled to set the hashs of the new data objects in the blockchain. Sending this transaction shouldn't cost too much (~0.002 Ether currently) but the contract will reject your post if you don't provide enough ether to pay the gas to set your data (currently hard coded to 70,000 gas per TX). All of the nodes running this application will then be able to resolve the same data from the last change to the wall from the blockchain and then download the data through the ipfs dht.</p>

<h1>Instuctions On Using</h1>
<p><b>Run Locally</b>
<br>
<br>
Boot up and ipfs client... Instructions on installing <a href="https://ipfs.io/docs/install/">ipfs</a>

Boot up an ethereum geth client with a small amount of ether on it and you're set. This currently defaults to account[0] or your primary account, I should probably build a drop down menu to select different accounts. Just remember to add origins to the CORS accept in both ipfs and ethereum if you get resource sharing problems. Also you need to unlock your geth account to post. Starting geth with the line below will set everything up to post.
<br>
<br>
In ipfs:
<code>export API_ORIGIN="http://localhost:8080"</code>
<br>
<br>
In geth:
<code>geth --rpc --rpccorsdomain "*" --unlock address</code>
<br>
<br>
<b>Run on a hosted node</b>
<br>
<br>
Coming soon! <---- link goes here, something like client.voxelot.us... but not that... or anything .us probably :)
</p>

<h1>Anon</h1>
<p>IPFS does not guarantee any anonymity. IPFS and Ethereum are inherently public when it comes to sharing your connection info. In the future IPFS could have ways of dialing into the TOR network and Ethereum could develop some mixing service similar to Darkcoin.</p>

<h1>In progress</h1>
<p>In the future we may have an IPFS/IPNS implementation that can connect browsers p2p so that gateways or IPFS installations would not be needed. Also IPNS should be able to use shared keys soon to allow others to publish to an IPNS ID which could elminate the need for ethereum. I will still keep ether built into the site as a tipping system for those who choose to run a geth node. Very interested in making this as easy as possible to use.  I have experimented with creating a server to host the nodes for people who do not know how to run one of their own. I need to fix some bugs. Would be cool if there was some ipfs connect info by the ether balance like number of peers etc. Getting a user system set up would be interesting, but probably not applicable for this site. Spread the data out to multiple objects and perhaps just allow old walls to fall off into obscurity while still maintaining the option to index any old data that has ever been posted to this application. Setting the scope variable by watching new blocks coming in and resolving the new data on the fly would be nice as well. I would also like to add a way for people to earn ether to fund their posts, perhaps a tipping system. Still need to build the ability to create sub threads like a normal chan site. Add video support.</p>

<h1>Caveats</h1>
<p>The data object will just continue to grow with every post.  This implies that every user has to download a copy of the database to use the application and DBs can get large. Also every time someone posts the new data hash to the blockchain they will be the only ones with that data on their ipfs node limiting the ability for others to connect to the current state of the data if they can't resolve that node in the routing. I am working on service discovery atm as suggested in this <a href="https://github.com/ipfs/notes/issues/15">issue</a>. For now if your board looks blank but has a current data hash, try resolving the hash on an IPFS gateway. IPNS now serves back muliple records with a sequence number to choose the most recent revision which will help keep users from appending new posts to an old data object and publishing data that deletes some recent posts as in the ethereum build. Finally there is currently the possibility for any person to read the contract code from the source code of this app and send in empty objects to the contract, effectively deleting all of the visible data. Or they could just send in any data they want displayed or even non-json formatted data and potentially break the application for everyone. I haven't yet built in any checks that would stop someone from doing this.</p>
