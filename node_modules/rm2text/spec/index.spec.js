var rm = require('../index.js');

describe('Ringgit', function(){
    it('should throw error', function(){
        expect(function(){ rm('123a'); }).toThrow();
    });
    it('should not throw error', function(){
        expect(function(){ rm('123a', true); }).not.toThrow();
    });
    it('should return undefined', function(){
        expect(rm('123a', true)).toBeUndefined();
    });
    it('should with se-', function(){
        expect(rm('10')).toEqual('sepuluh ringgit');
        expect(rm('100')).toEqual('seratus ringgit');
        expect(rm('1000')).toEqual('seribu ringgit');
        expect(rm('1010')).toEqual('seribu sepuluh ringgit');
        expect(rm('10100')).toEqual('sepuluh ribu seratus ringgit');
        expect(rm('101000')).toEqual('seratus seribu ringgit');
    });
    it('should return', function(){
        expect(rm('123.45')).toEqual('seratus dua puluh tiga ringgit empat puluh lima sen');
    });

    it('should accpet comma', function(){
        expect(rm('1,010,000')).toEqual('sejuta sepuluh ribu ringgit');
    });

    it('should accept currency', function(){
        expect(rm('rm1,010,000')).toEqual('sejuta sepuluh ribu ringgit');
        expect(rm('myr1,010,000')).toEqual('sejuta sepuluh ribu ringgit');
        expect(rm('RM1,010,000')).toEqual('sejuta sepuluh ribu ringgit');
        expect(rm('RM  1,010,000')).toEqual('sejuta sepuluh ribu ringgit');
    });

    it('should return complicated', function(){
        expect(rm('1,053,000,320,677,423.60')).toEqual('seribu lima puluh tiga juta tiga ratus dua puluh juta enam ratus tujuh puluh tujuh ribu empat ratus dua puluh tiga ringgit enam puluh sen');
    });
});
