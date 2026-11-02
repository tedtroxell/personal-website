import unittest
import torch
from ood import ClassDistance, Trigger, promotion_gate

class Tests(unittest.TestCase):
    def setUp(self):
        torch.manual_seed(3)
        self.x = torch.randn(400, 3)
        self.y = torch.arange(400) % 2
        self.d = ClassDistance(2, 3).fit(self.x, self.y)

    def test_distance_and_calibration(self):
        self.d.calibrate(torch.randn(1000, 3))
        self.assertGreater(self.d(torch.ones(1, 3)*12).item(), self.d.threshold.item())
        self.assertTrue((self.d(self.x) >= 0).all())
        self.d.fit(self.x, self.y)
        self.assertTrue(torch.isinf(self.d.threshold))

    def test_invalid_and_missing_class(self):
        for x in (torch.ones(0,3), torch.ones(2,4), torch.full((2,3),float('nan'))):
            with self.assertRaises(ValueError): self.d(x)
        with self.assertRaises(ValueError): self.d.fit(self.x, torch.zeros(400,dtype=torch.long))
        with self.assertRaises(ValueError): self.d.calibrate(self.x, 1.)

    def test_state_roundtrip(self):
        self.d.calibrate(self.x)
        other = ClassDistance(2,3)
        other.load_state_dict(self.d.state_dict())
        torch.testing.assert_close(self.d(self.x), other(self.x))
        torch.testing.assert_close(self.d.threshold, other.threshold)

    def test_trigger_labels_persistence_cooldown(self):
        t = Trigger()
        for ts in (0,600,1200):
            self.assertFalse(t.observe(total=200,flagged=40,timestamp=ts,reviewed_labels=0,contract_ok=True))
        self.assertTrue(t.observe(total=200,flagged=40,timestamp=1800,reviewed_labels=200,contract_ok=True))
        for ts in (2400,3000,3600):
            self.assertFalse(t.observe(total=200,flagged=40,timestamp=ts,reviewed_labels=200,contract_ok=True))
        with self.assertRaises(ValueError):
            t.observe(total=200,flagged=40,timestamp=3600,reviewed_labels=200,contract_ok=True)

    def test_low_volume_resets_and_contract_blocks(self):
        t = Trigger(required_windows=1)
        self.assertFalse(t.observe(total=20,flagged=20,timestamp=1,reviewed_labels=300,contract_ok=True))
        self.assertEqual(t.streak,0)
        self.assertFalse(t.observe(total=200,flagged=100,timestamp=2,reviewed_labels=300,contract_ok=False))

    def test_promotion_is_separate(self):
        self.assertFalse(promotion_gate(.95,.90,.70,.90))
        self.assertFalse(promotion_gate(.95,.95,.90,.90))
        self.assertTrue(promotion_gate(.95,.95,.70,.75))
        with self.assertRaises(ValueError): promotion_gate(.9,float('nan'),.7,.8)

if __name__ == '__main__': unittest.main()
