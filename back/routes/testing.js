


var numberArray = [];
var trueArray = [];

for (var i=0;i<101;i++)
{
    numberArray.push(i);
    trueArray.push(true);
}

var terminal=numberArray.length;
var x=18;
while(terminal>=0)
{
    var i = Math.ceil(Math.random()*100);
    if(trueArray[i]==true)
    {
        trueArray[i]=false;
        if(numberArray[i]==x)
        {
            console.log("Found at: "+i+"th position");
            break;
        }
        terminal -= 1;
    }
}
if(terminal<0)
{
    console.log("Not Found");
}