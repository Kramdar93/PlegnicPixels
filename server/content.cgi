
use CGI;                             # load CGI routines
use FindBin;                         # find our location
$q = CGI->new;                       # create new CGI object
$result = "";                        # string to store result
$contentFolder = "$FindBin::Bin/../content";

sub getFilesInFolder{
    opendir(my $dir, $contentFolder.'/'.@_[0]) or die "@{[ $contentFolder.'/'.@_[0] ]}: $!";
    my $res = "";
    my $i = 0;
    while (my $filename = readdir($dir) and (@_[1] < 0 or $i < @_[1]) ) {
        if ($i != 0){
            $res = $res.',';
        }

        open(my $file, $contentFolder.'/'.$filename) or next; #die "@{[ $contentFolder.'/'.$filename ]}: $!";

        while (my $row = <$file>) {
            $res = $res.$row;
        }

        close($file);
        $i = $i + 1;
    }
    closedir($dir);
    return $res;
}

$type = $q->param('type');

if( $type eq 'peel' ){
    #get only the first few of game and blog
    $result = "{ games: [".getFilesInFolder('game',10)."], blogs: [".getFilesInFolder('blog',10)."] }";
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

print $q->header,                    # create the HTTP header
    $result;                         # and result.