#!usr/bin/perlml
#use cPanelUserConfig;

use CGI;
use FindBin;                         # find our location
$q = CGI->new("");
$result = "";                        # string to store result
$contentFolder = $FindBin::Bin;
$contentFolder =~ s/\/[^\/]*$//;     # manually go up a level...
$contentFolder = "$contentFolder/content/";

sub getFilesInFolder{
    opendir(my $dir, $contentFolder.@_[0]) or die "@{[ $contentFolder.@_[0] ]}: $!";
    my $res = "";
    my $i = 0;
    while (my $filename = readdir($dir) and (@_[1] < 0 or $i < @_[1]) ) {
        #print "$filename\n";

        if ($i != 0){
            $res = "$res,";
        }

        open(my $file, $contentFolder.@_[0].'/'.$filename) or next; #(print "@{[ $contentFolder.@_[0].'/'.$filename ]}: $!" and next);

        while (my $row = <$file>) {
            #print "$row\n";
            $res = "$res $row";
        }

        close($file);
        $i = $i + 1;
    }
    closedir($dir);
    return $res;
}

$type = $ARGV[0];

if( $type eq 'peel' ){
    #get only the first few of game and blog
    $result = "{ \"games\": [".getFilesInFolder('game',10)."], \"blogs\": [".getFilesInFolder('blog',10)."] }";
}
elsif( $type eq 'game' ||
        $type eq 'blog' ||
        $type eq 'about' ||
        $type eq 'contributor'  ){
    #get all of designated folder
    $result = "[ ".getFilesInFolder($type,-1)." ]";
}
else{
    if($type){
        $result = "unknown type: $type";
    }
    else{
        $result = "no parameter of name 'type'";
    }
    
}

$result =~ s/\n//g; # remove newlines

print #$q->header,                    # create the HTTP header
    $result;                         # and result.