import { UpdateTypesMatcher } from './update-types';

describe('util/package-rules/update-types', () => {
  const updateTypesMatcher = new UpdateTypesMatcher();

  describe('match', () => {
    it('should return null if matchUpdateTypes is undefined', () => {
      const result = updateTypesMatcher.matches(
        {
          updateType: 'minor',
        },
        {},
      );
      expect(result).toBeNull();
    });

    it('should return false if updateType is not defined', () => {
      const result = updateTypesMatcher.matches(
        {},
        {
          matchUpdateTypes: ['major'],
        },
      );
      expect(result).toBeFalse();
    });

    it('should match major updateType', () => {
      const result = updateTypesMatcher.matches(
        {
          updateType: 'major',
        },
        {
          matchUpdateTypes: ['major'],
        },
      );
      expect(result).toBeTrue();
    });

    it('should match minor updateType', () => {
      const result = updateTypesMatcher.matches(
        {
          updateType: 'minor',
        },
        {
          matchUpdateTypes: ['minor', 'patch'],
        },
      );
      expect(result).toBeTrue();
    });

    it('should match patch updateType', () => {
      const result = updateTypesMatcher.matches(
        {
          updateType: 'patch',
        },
        {
          matchUpdateTypes: ['patch'],
        },
      );
      expect(result).toBeTrue();
    });

    it('should match security updateType', () => {
      const result = updateTypesMatcher.matches(
        {
          updateType: 'security',
        },
        {
          matchUpdateTypes: ['security'],
        },
      );
      expect(result).toBeTrue();
    });

    it('should match security with multiple updateTypes', () => {
      const result = updateTypesMatcher.matches(
        {
          updateType: 'security',
        },
        {
          matchUpdateTypes: ['major', 'security', 'minor'],
        },
      );
      expect(result).toBeTrue();
    });

    it('should return false when updateType does not match', () => {
      const result = updateTypesMatcher.matches(
        {
          updateType: 'major',
        },
        {
          matchUpdateTypes: ['minor', 'patch'],
        },
      );
      expect(result).toBeFalse();
    });

    it('should return false when security does not match', () => {
      const result = updateTypesMatcher.matches(
        {
          updateType: 'security',
        },
        {
          matchUpdateTypes: ['major', 'minor'],
        },
      );
      expect(result).toBeFalse();
    });

    it('should match bump when isBump is true', () => {
      const result = updateTypesMatcher.matches(
        {
          updateType: 'patch',
          isBump: true,
        },
        {
          matchUpdateTypes: ['bump'],
        },
      );
      expect(result).toBeTrue();
    });

    it('should match both updateType and bump', () => {
      const result = updateTypesMatcher.matches(
        {
          updateType: 'minor',
          isBump: true,
        },
        {
          matchUpdateTypes: ['minor'],
        },
      );
      expect(result).toBeTrue();
    });
  });
});
